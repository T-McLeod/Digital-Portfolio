from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SkillViewSet, ProjectViewSet, ExperienceViewSet

router = DefaultRouter()
router.register(r"skills", SkillViewSet, basename="skill")
router.register(r"projects", ProjectViewSet, basename="project")
router.register(r"experience", ExperienceViewSet, basename="experience")

urlpatterns = [
    path("", include(router.urls)),
]
