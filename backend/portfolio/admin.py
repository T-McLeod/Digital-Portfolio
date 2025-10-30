from django.contrib import admin
from .models import Skill, Project, Experience, ProjectSkill


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    search_fields = ["name"]


class ProjectSkillInline(admin.TabularInline):
    model = ProjectSkill
    extra = 1
    autocomplete_fields = ["skill"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "is_featured", "is_ai_feature", "order"]
    list_filter = ["is_featured", "is_ai_feature"]
    search_fields = ["title", "description"]
    list_editable = ["order", "is_featured"]
    prepopulated_fields = {"slug": ("title",)}
    inlines = [ProjectSkillInline]
    
    fieldsets = (
        (None, {
            "fields": ("title", "slug", "description", "long_description")
        }),
        ("Images", {
            "fields": ("image_url", "gallery_images")
        }),
        ("Links", {
            "fields": ("live_url", "github_url")
        }),
        ("Settings", {
            "fields": ("tags", "is_featured", "is_ai_feature", "order")
        }),
    )


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ["id", "role", "company", "period", "order"]
    search_fields = ["role", "company"]
    filter_horizontal = ["skills"]
    list_editable = ["order"]
