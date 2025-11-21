from rest_framework import serializers
from .models import Skill, Project, Experience, ProjectSkill, ProjectLink


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


class ProjectLinkSerializer(serializers.ModelSerializer):
    """Serializer for project links"""
    displayName = serializers.CharField(source="display_name")
    svgIcon = serializers.CharField(source="svg_icon", allow_blank=True, required=False)
    
    class Meta:
        model = ProjectLink
        fields = ["id", "displayName", "url", "svgIcon", "order"]


class ProjectListSerializer(serializers.ModelSerializer):
    """Serializer for project list view (home page) - only featured skills"""
    imageUrl = serializers.SerializerMethodField()
    isAiFeature = serializers.BooleanField(source="is_ai_feature")
    isFeatured = serializers.BooleanField(source="is_featured")
    skills = serializers.SerializerMethodField()
    links = ProjectLinkSerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = ["id", "title", "description", "tags", "imageUrl", "isAiFeature", "isFeatured", "skills", "links", "slug"]
    
    def get_imageUrl(self, obj):
        """Return uploaded image URL if exists, otherwise external URL"""
        # Use request context to build an absolute URI so frontend can load
        # media from the backend host instead of resolving relative to the
        # frontend origin.
        request = self.context.get('request') if hasattr(self, 'context') else None
        if obj.image:
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url
    
    def get_skills(self, obj):
        """Return only featured skills for list view"""
        project_skills = ProjectSkill.objects.filter(project=obj, is_featured=True).select_related("skill")
        return ProjectSkillSerializer(project_skills, many=True).data


class ProjectDetailSerializer(serializers.ModelSerializer):
    """Serializer for project detail view - all skills"""
    imageUrl = serializers.SerializerMethodField()
    galleryImages = serializers.SerializerMethodField()
    longDescription = serializers.CharField(source="long_description")
    isAiFeature = serializers.BooleanField(source="is_ai_feature")
    isFeatured = serializers.BooleanField(source="is_featured")
    skills = serializers.SerializerMethodField()
    links = ProjectLinkSerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = [
            "id", "title", "description", "longDescription", "tags", 
            "imageUrl", "galleryImages",
            "isAiFeature", "isFeatured", "skills", "links", "slug"
        ]
    
    def get_imageUrl(self, obj):
        """Return uploaded image URL if exists, otherwise external URL"""
        # Use request context to build an absolute URI so frontend can load
        # media from the backend host instead of resolving relative to the
        # frontend origin.
        request = self.context.get('request') if hasattr(self, 'context') else None
        if obj.image:
            if request is not None:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url
    
    def get_galleryImages(self, obj):
        """Return gallery images from both uploaded files and URLs"""
        # First, get images from GalleryImage model
        gallery_objects = obj.gallery.all()
        # Build absolute URIs for any uploaded images
        request = self.context.get('request') if hasattr(self, 'context') else None
        images = []
        for img in gallery_objects:
            url = img.get_image_url()
            if not url:
                continue
            # img.get_image_url() returns a relative path for uploaded files
            if img.image and request is not None:
                images.append(request.build_absolute_uri(img.image.url))
            else:
                images.append(url)
        
        # If no gallery objects exist, fall back to legacy gallery_images JSON field
        if not images and hasattr(obj, 'gallery_images') and obj.gallery_images:
            # legacy gallery_images may already include absolute URLs or relative
            # paths; if relative and we have a request, make them absolute.
            if request is not None:
                images = [request.build_absolute_uri(u) if u.startswith('/') else u for u in obj.gallery_images]
            else:
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
