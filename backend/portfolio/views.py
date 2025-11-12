from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Skill, Project, Experience
from .serializers import SkillSerializer, ProjectListSerializer, ProjectDetailSerializer, ExperienceSerializer


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = SkillSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        """Filter to featured skills by default on list view"""
        queryset = Skill.objects.all()
        
        if self.action == "list":
            # Check if we should show all skills or just featured
            show_all = self.request.query_params.get("all", "false").lower() == "true"
            if not show_all:
                queryset = queryset.filter(is_featured=True)
        
        return queryset


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [AllowAny]
    lookup_field = "slug"
    
    def get_queryset(self):
        queryset = Project.objects.prefetch_related("skills").all()
        
        # Filter for featured projects on list view
        if self.action == "list":
            featured_only = self.request.query_params.get("featured", "true").lower() == "true"
            if featured_only:
                queryset = queryset.filter(is_featured=True)
        
        return queryset
    
    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProjectDetailSerializer
        return ProjectListSerializer


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.prefetch_related("skills").all()
    serializer_class = ExperienceSerializer
    permission_classes = [AllowAny]
