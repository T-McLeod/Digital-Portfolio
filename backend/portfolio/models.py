from django.db import models


class Skill(models.Model):
    name = models.CharField(max_length=100)
    svg_icon = models.TextField(help_text="SVG markup for the skill icon")
    order = models.IntegerField(default=0, help_text="Display order (lower numbers first)", db_index=True)
    is_featured = models.BooleanField(default=True, help_text="Show in general skills list")
    
    class Meta:
        ordering = ["order", "name"]
        
    def __str__(self):
        return self.name


class ProjectSkill(models.Model):
    """Through model for Project-Skill relationship with featured flag"""
    project = models.ForeignKey("Project", on_delete=models.CASCADE)
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    is_featured = models.BooleanField(default=False, help_text="Show this skill on home page for this project")
    
    class Meta:
        unique_together = ["project", "skill"]
        ordering = ["-is_featured", "skill__name"]
    
    def __str__(self):
        return f"{self.project.title} - {self.skill.name}"


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(help_text="Short description for card view")
    long_description = models.TextField(blank=True, help_text="Detailed description for project page")
    tags = models.JSONField(default=list, help_text="List of technology tags")
    
    # Image handling: Upload takes priority over URL
    image = models.ImageField(upload_to='projects/', blank=True, null=True, help_text="Upload main project image")
    image_url = models.URLField(max_length=500, blank=True, help_text="Or provide image URL (used if no upload)")
    
    live_url = models.URLField(max_length=500, blank=True, null=True)
    github_url = models.URLField(max_length=500, blank=True, null=True)
    is_ai_feature = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=True, help_text="Show on home page")
    skills = models.ManyToManyField(Skill, through=ProjectSkill, related_name="projects", blank=True)
    order = models.IntegerField(default=0, help_text="Display order")
    slug = models.SlugField(max_length=200, unique=True, help_text="URL-friendly identifier")
    
    class Meta:
        ordering = ["order", "-id"]
    
    def __str__(self):
        return self.title
    
    def get_featured_skills(self):
        """Get only featured skills for this project"""
        return self.skills.filter(projectskill__is_featured=True)
    
    def get_image_url(self):
        """Return uploaded image URL if exists, otherwise external URL"""
        if self.image:
            return self.image.url
        return self.image_url


class GalleryImage(models.Model):
    """Gallery images for project slideshow"""
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='gallery')
    image = models.ImageField(upload_to='gallery/', help_text="Upload gallery image")
    image_url = models.URLField(max_length=500, blank=True, help_text="Or provide image URL")
    order = models.IntegerField(default=0, help_text="Display order in gallery")
    caption = models.CharField(max_length=200, blank=True, help_text="Optional image caption")
    
    class Meta:
        ordering = ['order', 'id']
    
    def __str__(self):
        return f"{self.project.title} - Gallery Image {self.order}"
    
    def get_image_url(self):
        """Return uploaded image URL if exists, otherwise external URL"""
        if self.image:
            return self.image.url
        return self.image_url


class Experience(models.Model):
    company = models.CharField(max_length=200)
    role = models.CharField(max_length=200)
    period = models.CharField(max_length=100, help_text="e.g., Jan 2020 - Dec 2022")
    description = models.JSONField(default=list, help_text="List of job responsibilities/achievements")
    skills = models.ManyToManyField(Skill, related_name="experiences", blank=True)
    order = models.IntegerField(default=0, help_text="Display order")
    
    class Meta:
        ordering = ["order", "-id"]
    
    def __str__(self):
        return f"{self.role} at {self.company}"
