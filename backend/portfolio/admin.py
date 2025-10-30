from django.contrib import admin
from .models import Skill, Project, Experience


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    search_fields = ["name"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "is_ai_feature", "order"]
    list_filter = ["is_ai_feature"]
    search_fields = ["title", "description"]
    filter_horizontal = ["skills"]
    list_editable = ["order"]


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ["id", "role", "company", "period", "order"]
    search_fields = ["role", "company"]
    filter_horizontal = ["skills"]
    list_editable = ["order"]
