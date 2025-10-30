from django.db import models


class Skill(models.Model):
    name = models.CharField(max_length=100)
    svg_icon = models.TextField(help_text="SVG markup for the skill icon")
    
    class Meta:
        ordering = ["name"]
    
    def __str__(self):
        return self.name


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    tags = models.JSONField(default=list, help_text="List of technology tags")
    image_url = models.URLField(max_length=500)
    live_url = models.URLField(max_length=500, blank=True, null=True)
    github_url = models.URLField(max_length=500, blank=True, null=True)
    is_ai_feature = models.BooleanField(default=False)
    skills = models.ManyToManyField(Skill, related_name="projects", blank=True)
    order = models.IntegerField(default=0, help_text="Display order")
    
    class Meta:
        ordering = ["order", "-id"]
    
    def __str__(self):
        return self.title


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
