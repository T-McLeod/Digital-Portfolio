from rest_framework import serializers
from .models import Skill, Project, Experience, ProjectSkill, GalleryImage


class SkillSerializer(serializers.ModelSerializer):
    svgIcon = serializers.CharField(source="svg_icon")
    
    class Meta:
        model = Skill
        fields = ["id", "name", "svgIcon"]


class ProjectSkillSerializer(serializers.ModelSerializer):
    """Serializer for featured skills with project context"""
    id = serializers.IntegerField(source="skill.id")
    name = serializers.CharField(source="skill.name")
    svgIcon = serializers.CharField(source="skill.svg_icon")
    isFeatured = serializers.BooleanField(source="is_featured")
    
    class Meta:
        model = ProjectSkill
        fields = ["id", "name", "svgIcon", "isFeatured"]


class ProjectListSerializer(serializers.ModelSerializer):
    """Serializer for project list view (home page) - only featured skills"""
    imageUrl = serializers.SerializerMethodField()
    liveUrl = serializers.URLField(source="live_url", allow_blank=True)
    githubUrl = serializers.URLField(source="github_url", allow_blank=True)
    isAiFeature = serializers.BooleanField(source="is_ai_feature")
    isFeatured = serializers.BooleanField(source="is_featured")
    skills = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = ["id", "title", "description", "tags", "imageUrl", "liveUrl", "githubUrl", "isAiFeature", "isFeatured", "skills", "slug"]
    
    def get_imageUrl(self, obj):
        """Return uploaded image URL if exists, otherwise external URL"""
        return obj.get_image_url()
    
    def get_skills(self, obj):
        """Return only featured skills for list view"""
        project_skills = ProjectSkill.objects.filter(project=obj, is_featured=True).select_related("skill")
        return ProjectSkillSerializer(project_skills, many=True).data


class ProjectDetailSerializer(serializers.ModelSerializer):
    """Serializer for project detail view - all skills"""
    imageUrl = serializers.SerializerMethodField()
    galleryImages = serializers.SerializerMethodField()
    longDescription = serializers.CharField(source="long_description")
    liveUrl = serializers.URLField(source="live_url", allow_blank=True)
    githubUrl = serializers.URLField(source="github_url", allow_blank=True)
    isAiFeature = serializers.BooleanField(source="is_ai_feature")
    isFeatured = serializers.BooleanField(source="is_featured")
    skills = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [
            "id", "title", "description", "longDescription", "tags", 
            "imageUrl", "galleryImages", "liveUrl", "githubUrl", 
            "isAiFeature", "isFeatured", "skills", "slug"
        ]
    
    def get_imageUrl(self, obj):
        """Return uploaded image URL if exists, otherwise external URL"""
        return obj.get_image_url()
    
    def get_galleryImages(self, obj):
        """Return gallery images from both uploaded files and URLs"""
        # First, get images from GalleryImage model
        gallery_objects = obj.gallery.all()
        images = [img.get_image_url() for img in gallery_objects if img.get_image_url()]
        
        # If no gallery objects exist, fall back to legacy gallery_images JSON field
        if not images and hasattr(obj, 'gallery_images') and obj.gallery_images:
            images = obj.gallery_images
        
        return images
    
    def get_skills(self, obj):
        """Return all skills with featured flag for detail view"""
        project_skills = ProjectSkill.objects.filter(project=obj).select_related("skill")
        return ProjectSkillSerializer(project_skills, many=True).data


class ExperienceSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    
    class Meta:
        model = Experience
        fields = ["id", "company", "role", "period", "description", "skills"]
