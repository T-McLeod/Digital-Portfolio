from django.contrib import admin
from django.utils.html import format_html
from .models import Skill, Project, Experience, ProjectSkill, GalleryImage


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]
    search_fields = ["name"]


class ProjectSkillInline(admin.TabularInline):
    model = ProjectSkill
    extra = 1
    autocomplete_fields = ["skill"]


class GalleryImageInline(admin.TabularInline):
    model = GalleryImage
    extra = 1
    fields = ["image", "image_url", "order", "caption", "image_preview"]
    readonly_fields = ["image_preview"]
    
    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" style="max-height: 100px; max-width: 200px;" />', obj.image.url)
        elif obj.image_url:
            return format_html('<img src="{}" style="max-height: 100px; max-width: 200px;" />', obj.image_url)
        return "No image"
    image_preview.short_description = "Preview"


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["id", "title", "is_featured", "is_ai_feature", "order", "main_image_preview"]
    list_filter = ["is_featured", "is_ai_feature"]
    search_fields = ["title", "description"]
    # Make `id` the clickable link and allow editing title/is_ai_feature inline
    list_display_links = ["title"]
    list_editable = ["order", "is_featured", "is_ai_feature"]
    prepopulated_fields = {"slug": ("title",)}
    inlines = [ProjectSkillInline, GalleryImageInline]
    
    fieldsets = (
        (None, {
            "fields": ("title", "slug", "description", "long_description")
        }),
        ("Main Image", {
            "fields": ("image", "image_url", "main_image_display"),
            "description": "Upload an image OR provide a URL. Upload takes priority."
        }),
        ("Links", {
            "fields": ("live_url", "github_url")
        }),
        ("Settings", {
            "fields": ("tags", "is_featured", "is_ai_feature", "order")
        }),
    )
    
    readonly_fields = ["main_image_display"]
    
    def main_image_preview(self, obj):
        """Small preview for list view"""
        img_url = obj.get_image_url()
        if img_url:
            return format_html('<img src="{}" style="max-height: 50px; max-width: 100px;" />', img_url)
        return "No image"
    main_image_preview.short_description = "Image"
    
    def main_image_display(self, obj):
        """Large preview for detail view"""
        img_url = obj.get_image_url()
        if img_url:
            return format_html('<img src="{}" style="max-height: 300px; max-width: 500px;" />', img_url)
        return "No image uploaded or URL provided"
    main_image_display.short_description = "Current Image"


@admin.register(GalleryImage)
class GalleryImageAdmin(admin.ModelAdmin):
    list_display = ["id", "project", "order", "image_preview"]
    list_filter = ["project"]
    list_editable = ["order"]
    readonly_fields = ["image_preview"]
    
    def image_preview(self, obj):
        img_url = obj.get_image_url()
        if img_url:
            return format_html('<img src="{}" style="max-height: 100px; max-width: 200px;" />', img_url)
        return "No image"
    image_preview.short_description = "Preview"


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display_links = ["role"]
    list_display = ["id", "role", "company", "period", "order"]
    search_fields = ["role", "company"]
    filter_horizontal = ["skills"]
    list_editable = ["order"]
