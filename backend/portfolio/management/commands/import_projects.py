import json
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from django.utils.text import slugify
from portfolio.models import Skill, Project, ProjectSkill, GalleryImage


class Command(BaseCommand):
    help = 'Bulk import projects from JSON file'

    def add_arguments(self, parser):
        parser.add_argument(
            'json_file',
            type=str,
            help='Path to JSON file containing project data'
        )
        parser.add_argument(
            '--update',
            action='store_true',
            help='Update existing projects (match by slug)'
        )
        parser.add_argument(
            '--skip-existing',
            action='store_true',
            help='Skip projects that already exist (match by slug)'
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Preview what would be created without actually creating it'
        )

    def handle(self, *args, **options):
        json_file = options['json_file']
        update_existing = options['update']
        skip_existing = options['skip_existing']
        dry_run = options['dry_run']

        if update_existing and skip_existing:
            raise CommandError('Cannot use --update and --skip-existing together')

        # Load JSON file
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
        except FileNotFoundError:
            raise CommandError(f'File not found: {json_file}')
        except json.JSONDecodeError as e:
            raise CommandError(f'Invalid JSON: {e}')

        if dry_run:
            self.stdout.write(self.style.WARNING('DRY RUN MODE - No changes will be made'))

        # Validate data structure
        if 'projects' not in data:
            raise CommandError('JSON must contain "projects" array')

        projects_data = data.get('projects', [])
        skills_data = data.get('skills', [])

        self.stdout.write(f'Found {len(projects_data)} projects to import')
        self.stdout.write(f'Found {len(skills_data)} skills definitions')

        # Import skills first (if provided)
        if skills_data and not dry_run:
            self.import_skills(skills_data)

        # Import projects
        created_count = 0
        updated_count = 0
        skipped_count = 0
        error_count = 0

        for idx, project_data in enumerate(projects_data, 1):
            try:
                result = self.import_project(project_data, update_existing, skip_existing, dry_run)
                if result == 'created':
                    created_count += 1
                    self.stdout.write(self.style.SUCCESS(f'  [{idx}/{len(projects_data)}] Created: {project_data.get("title")}'))
                elif result == 'updated':
                    updated_count += 1
                    self.stdout.write(self.style.SUCCESS(f'  [{idx}/{len(projects_data)}] Updated: {project_data.get("title")}'))
                elif result == 'skipped':
                    skipped_count += 1
                    self.stdout.write(self.style.WARNING(f'  [{idx}/{len(projects_data)}] Skipped: {project_data.get("title")} (already exists)'))
            except Exception as e:
                error_count += 1
                self.stdout.write(self.style.ERROR(f'  [{idx}/{len(projects_data)}] Error: {project_data.get("title", "Unknown")} - {str(e)}'))

        # Summary
        self.stdout.write('\n' + '='*60)
        if dry_run:
            self.stdout.write(self.style.WARNING('DRY RUN COMPLETE - No changes made'))
        else:
            self.stdout.write(self.style.SUCCESS('IMPORT COMPLETE'))
        self.stdout.write(f'Created: {created_count}')
        self.stdout.write(f'Updated: {updated_count}')
        self.stdout.write(f'Skipped: {skipped_count}')
        if error_count > 0:
            self.stdout.write(self.style.ERROR(f'Errors: {error_count}'))

    def import_skills(self, skills_data):
        """Import or update skills from skills array"""
        for skill_data in skills_data:
            name = skill_data.get('name')
            svg_icon = skill_data.get('svg_icon', '')

            if not name:
                self.stdout.write(self.style.WARNING(f'  Skipping skill with no name'))
                continue

            skill, created = Skill.objects.get_or_create(
                name=name,
                defaults={'svg_icon': svg_icon}
            )

            if not created and svg_icon:
                # Update SVG icon if provided
                skill.svg_icon = svg_icon
                skill.save()
                self.stdout.write(f'  Updated skill: {name}')
            elif created:
                self.stdout.write(f'  Created skill: {name}')

    @transaction.atomic
    def import_project(self, project_data, update_existing, skip_existing, dry_run):
        """Import or update a single project"""
        title = project_data.get('title')
        slug = project_data.get('slug') or slugify(title)

        if not title:
            raise ValueError('Project must have a title')

        # Check if project exists
        existing_project = Project.objects.filter(slug=slug).first()

        if existing_project:
            if skip_existing:
                return 'skipped'
            elif not update_existing:
                raise ValueError(f'Project with slug "{slug}" already exists. Use --update or --skip-existing')

        if dry_run:
            return 'created' if not existing_project else 'updated'

        # Prepare project fields
        project_fields = {
            'title': title,
            'slug': slug,
            'description': project_data.get('description', ''),
            'long_description': project_data.get('long_description', ''),
            'tags': project_data.get('tags', []),
            'is_ai_feature': project_data.get('is_ai_feature', False),
            'is_featured': project_data.get('is_featured', True),
            'order': project_data.get('order', 0),
        }

        # Handle main image
        image_data = project_data.get('image', {})
        if isinstance(image_data, dict):
            if image_data.get('type') == 'url':
                project_fields['image_url'] = image_data.get('value', '')
            # TODO: Handle file uploads if needed
        elif isinstance(image_data, str):
            # Legacy: direct URL string
            project_fields['image_url'] = image_data

        # Create or update project
        if existing_project:
            for key, value in project_fields.items():
                setattr(existing_project, key, value)
            existing_project.save()
            project = existing_project
            action = 'updated'
        else:
            project = Project.objects.create(**project_fields)
            action = 'created'

        # Handle skills
        skills_data = project_data.get('skills', [])
        if skills_data:
            # Clear existing skills if updating
            if existing_project:
                ProjectSkill.objects.filter(project=project).delete()

            for skill_data in skills_data:
                skill_name = skill_data.get('name')
                is_featured = skill_data.get('is_featured', False)
                svg_icon = skill_data.get('svg_icon')

                if not skill_name:
                    continue

                # Get or create skill
                skill_defaults = {}
                if svg_icon:
                    skill_defaults['svg_icon'] = svg_icon

                skill, created = Skill.objects.get_or_create(
                    name=skill_name,
                    defaults=skill_defaults
                )

                # Update SVG icon if provided and skill exists
                if not created and svg_icon and skill.svg_icon != svg_icon:
                    skill.svg_icon = svg_icon
                    skill.save()

                # Create ProjectSkill relationship
                ProjectSkill.objects.create(
                    project=project,
                    skill=skill,
                    is_featured=is_featured
                )

        # Handle gallery images
        gallery_data = project_data.get('gallery_images', [])
        if gallery_data:
            # Clear existing gallery images if updating
            if existing_project:
                GalleryImage.objects.filter(project=project).delete()

            for gallery_item in gallery_data:
                if isinstance(gallery_item, dict):
                    gallery_fields = {
                        'project': project,
                        'order': gallery_item.get('order', 0),
                        'caption': gallery_item.get('caption', ''),
                    }

                    if gallery_item.get('type') == 'url':
                        gallery_fields['image_url'] = gallery_item.get('value', '')
                    # TODO: Handle file uploads if needed

                    GalleryImage.objects.create(**gallery_fields)
                elif isinstance(gallery_item, str):
                    # Legacy: direct URL string
                    GalleryImage.objects.create(
                        project=project,
                        image_url=gallery_item,
                        order=0
                    )

        return action
