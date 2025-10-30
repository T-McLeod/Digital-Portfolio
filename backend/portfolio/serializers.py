from rest_framework import serializers
from .models import Skill, Project, Experience


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["id", "name", "svg_icon"]


class ProjectSerializer(serializers.ModelSerializer):
    imageUrl = serializers.URLField(source="image_url")
    liveUrl = serializers.URLField(source="live_url", allow_null=True)
    githubUrl = serializers.URLField(source="github_url", allow_null=True)
    isAiFeature = serializers.BooleanField(source="is_ai_feature")
    skills = SkillSerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = ["id", "title", "description", "tags", "imageUrl", "liveUrl", "githubUrl", "isAiFeature", "skills"]


class ExperienceSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    
    class Meta:
        model = Experience
        fields = ["id", "company", "role", "period", "description", "skills"]
