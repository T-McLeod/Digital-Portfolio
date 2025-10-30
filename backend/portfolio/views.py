from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Skill, Project, Experience
from .serializers import SkillSerializer, ProjectSerializer, ExperienceSerializer


class SkillViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [AllowAny]


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.prefetch_related("skills").all()
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]


class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.prefetch_related("skills").all()
    serializer_class = ExperienceSerializer
    permission_classes = [AllowAny]
