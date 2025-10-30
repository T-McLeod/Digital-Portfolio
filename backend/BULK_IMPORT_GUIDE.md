# Bulk Project Import Guide

## Overview

Import multiple projects at once using a JSON file! Perfect for:
- Migrating from another portfolio system
- Batch adding multiple projects
- Backing up and restoring projects
- Team collaboration on project data

## Quick Start

### 1. Create Your JSON File

Use the template: `backend/bulk_upload_template.json`

```bash
cp backend/bulk_upload_template.json backend/my_projects.json
# Edit my_projects.json with your project data
```

### 2. Run Import Command

```bash
cd backend
python manage.py import_projects my_projects.json
```

Done! Your projects are now in the database.

## JSON Format Specification

### Root Structure

```json
{
  "projects": [...],  // Required: Array of project objects
  "skills": [...]     // Optional: Pre-define skills with SVG icons
}
```

### Project Object

```json
{
  "title": "Project Title",                    // Required
  "slug": "project-slug",                      // Optional: auto-generated from title
  "description": "Short description",          // Required: 1-2 sentences
  "long_description": "Detailed...",           // Optional: multi-paragraph
  "tags": ["Tag1", "Tag2"],                    // Optional: string array
  "image": {...},                              // Optional: main image
  "gallery_images": [...],                     // Optional: slideshow images
  "live_url": "https://example.com",           // Optional: demo link
  "github_url": "https://github.com/...",      // Optional: repo link
  "is_featured": true,                         // Optional: default true
  "is_ai_feature": false,                      // Optional: default false
  "order": 1,                                  // Optional: display order
  "skills": [...]                              // Optional: associated skills
}
```

### Image Format

#### Using URLs (Recommended for now)
```json
"image": {
  "type": "url",
  "value": "https://images.unsplash.com/photo-123.jpg"
}
```

#### Legacy Format (Also Works)
```json
"image": "https://images.unsplash.com/photo-123.jpg"
```

### Gallery Images Format

```json
"gallery_images": [
  {
    "type": "url",
    "value": "https://example.com/image1.jpg",
    "caption": "Optional caption",
    "order": 0
  },
  {
    "type": "url",
    "value": "https://example.com/image2.jpg",
    "order": 1
  }
]
```

### Skills Format (Per Project)

```json
"skills": [
  {
    "name": "React",                           // Required
    "is_featured": true,                       // Optional: show on homepage
    "svg_icon": "<svg>...</svg>"               // Optional: custom icon
  },
  {
    "name": "Node.js",
    "is_featured": false
  }
]
```

### Global Skills (Optional)

Pre-define skills with SVG icons:

```json
"skills": [
  {
    "name": "FastAPI",
    "svg_icon": "<svg xmlns=\"http://www.w3.org/2000/svg\">...</svg>"
  }
]
```

## Command Options

### Basic Import

```bash
python manage.py import_projects projects.json
```

Creates all projects. **Fails if project already exists** (safety feature).

### Update Existing Projects

```bash
python manage.py import_projects projects.json --update
```

Updates projects that already exist (matches by slug).

### Skip Existing Projects

```bash
python manage.py import_projects projects.json --skip-existing
```

Only imports new projects, skips existing ones.

### Dry Run (Preview)

```bash
python manage.py import_projects projects.json --dry-run
```

Shows what would happen without making changes. **Always test first!**

### Combined Example

```bash
# Safe: preview first
python manage.py import_projects my_projects.json --dry-run

# Then: skip existing and only add new ones
python manage.py import_projects my_projects.json --skip-existing
```

## Features

### ✅ Smart Skill Management

- **Auto-create skills**: Skills that don't exist are created automatically
- **Update SVG icons**: Provide icon in skill definition or per-project
- **Reuse existing**: Skills with same name are reused across projects
- **Featured flags**: Control which skills show on homepage per project

### ✅ Duplicate Handling

- **Slug matching**: Projects identified by unique slug
- **Three modes**:
  1. Default: Fail if exists (safe)
  2. `--update`: Overwrite existing projects
  3. `--skip-existing`: Only add new projects

### ✅ Validation & Safety

- **Dry run mode**: Preview before committing
- **Transaction support**: All-or-nothing per project
- **Error reporting**: Shows which projects failed and why
- **Progress tracking**: Real-time status for large imports

### ✅ Backward Compatible

- **Legacy formats**: Supports old image URL formats
- **Optional fields**: Only title is required
- **Slug generation**: Auto-generates from title if not provided

## Examples

### Example 1: Simple Project (Minimal)

```json
{
  "projects": [
    {
      "title": "My Simple Project",
      "description": "A basic project with minimal config",
      "tags": ["JavaScript", "HTML", "CSS"],
      "image": {
        "type": "url",
        "value": "https://via.placeholder.com/800x600"
      }
    }
  ]
}
```

### Example 2: Full-Featured Project

```json
{
  "projects": [
    {
      "title": "Advanced E-Commerce Platform",
      "slug": "ecommerce-platform-pro",
      "description": "Enterprise-grade e-commerce solution with advanced features",
      "long_description": "A comprehensive platform built with modern technologies.\n\nFeatures include:\n- Real-time inventory\n- Multi-currency support\n- AI-powered recommendations\n- Advanced analytics",
      "tags": ["React", "Node.js", "PostgreSQL", "Redis", "Docker"],
      "image": {
        "type": "url",
        "value": "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80"
      },
      "gallery_images": [
        {
          "type": "url",
          "value": "https://images.unsplash.com/photo-1.jpg",
          "caption": "Dashboard Overview",
          "order": 0
        },
        {
          "type": "url",
          "value": "https://images.unsplash.com/photo-2.jpg",
          "caption": "Product Catalog",
          "order": 1
        }
      ],
      "live_url": "https://demo.example.com",
      "github_url": "https://github.com/username/project",
      "is_featured": true,
      "is_ai_feature": false,
      "order": 1,
      "skills": [
        {
          "name": "React",
          "is_featured": true
        },
        {
          "name": "Node.js",
          "is_featured": true
        },
        {
          "name": "PostgreSQL",
          "is_featured": true
        },
        {
          "name": "Redis",
          "is_featured": false
        },
        {
          "name": "Docker",
          "is_featured": false
        }
      ]
    }
  ]
}
```

### Example 3: Multiple Projects with Shared Skills

```json
{
  "skills": [
    {
      "name": "Vue.js",
      "svg_icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M2 3h3.5L12 15l6.5-12H22L12 21 2 3z\"/></svg>"
    }
  ],
  "projects": [
    {
      "title": "Project Alpha",
      "description": "First project using Vue",
      "skills": [
        {"name": "Vue.js", "is_featured": true},
        {"name": "TypeScript", "is_featured": true}
      ]
    },
    {
      "title": "Project Beta",
      "description": "Second project using Vue",
      "skills": [
        {"name": "Vue.js", "is_featured": true},
        {"name": "Node.js", "is_featured": false}
      ]
    }
  ]
}
```

## Workflow Recommendations

### For New Projects

1. **Start with template**:
   ```bash
   cp bulk_upload_template.json new_projects.json
   ```

2. **Edit in your favorite editor** (VS Code, etc.)

3. **Dry run first**:
   ```bash
   python manage.py import_projects new_projects.json --dry-run
   ```

4. **Import**:
   ```bash
   python manage.py import_projects new_projects.json
   ```

### For Updating Projects

1. **Export current state** (manual backup recommended)

2. **Edit JSON file** with changes

3. **Test with dry run**:
   ```bash
   python manage.py import_projects updated.json --update --dry-run
   ```

4. **Apply updates**:
   ```bash
   python manage.py import_projects updated.json --update
   ```

### For Team Collaboration

1. **Store JSON in version control** (separate repo or private)

2. **Each team member adds their projects** to JSON

3. **Merge and import**:
   ```bash
   git pull
   python manage.py import_projects team_projects.json --skip-existing
   ```

## Tips & Best Practices

### 📝 Content Tips

- **Use real slugs**: Make them URL-friendly and meaningful
- **Write good descriptions**: Short = 1-2 sentences, Long = detailed
- **Tag consistently**: Use same tag names across projects
- **Order matters**: Lower numbers appear first

### 🎨 Image Tips

- **Use high-quality URLs**: Unsplash, Imgur, or your CDN
- **Test image URLs**: Make sure they load before importing
- **Gallery order**: Start from 0, increment by 1
- **Add captions**: Makes gallery more informative

### 🏷️ Skill Tips

- **Define icons once**: Use global skills section for common skills
- **Featured = 3-5 max**: Don't feature too many skills per project
- **Consistent naming**: "React" not "ReactJS", "TypeScript" not "TS"
- **SVG format**: Use simple SVG markup, avoid inline styles

### ⚠️ Safety Tips

- **Always dry-run first**: `--dry-run` is your friend
- **Backup database**: Before bulk updates
- **Start small**: Test with 1-2 projects first
- **Use version control**: Keep JSON files in git
- **Validate JSON**: Use JSON validator before importing

## Troubleshooting

### "Project already exists"

**Solution 1**: Use `--skip-existing` to ignore duplicates
```bash
python manage.py import_projects file.json --skip-existing
```

**Solution 2**: Use `--update` to overwrite
```bash
python manage.py import_projects file.json --update
```

### "Invalid JSON"

- Check for missing commas
- Check for trailing commas (not allowed in JSON)
- Use JSON validator: https://jsonlint.com
- Use editor with JSON validation (VS Code)

### "Skill not found"

Skills are auto-created! But check:
- Skill name spelling matches exactly
- No extra whitespace
- Case matches (case-sensitive)

### Images not appearing

- Verify image URLs load in browser
- Check URL format is correct
- Ensure URLs are publicly accessible
- Check CORS if images from external domain

## Advanced: Export Existing Projects

Want to backup or migrate? Create custom export command:

```bash
python manage.py dumpdata portfolio.Project portfolio.Skill portfolio.ProjectSkill portfolio.GalleryImage --indent 2 > backup.json
```

(Note: This creates Django fixture format, not the import format)

## File Location

Store your JSON files in:
```
backend/
├── bulk_upload_template.json    # Template/example
├── my_projects.json              # Your projects (gitignored)
└── portfolio/
    └── management/
        └── commands/
            └── import_projects.py
```

Add to `.gitignore`:
```
# Custom project data
backend/my_projects.json
backend/*_projects.json
```

## Summary

**✅ What You Can Do**:
- Import unlimited projects at once
- Auto-create or reuse skills
- Update existing projects
- Preview changes with dry-run
- Handle images via URLs (uploads coming soon)
- Set featured flags per skill per project
- Organize with tags and ordering

**🎯 Best Use Cases**:
- Initial portfolio setup
- Migrating from another system
- Batch updates to multiple projects
- Team collaboration
- Backup and restore
- Testing with sample data

**📚 Key Commands**:
```bash
# Preview
python manage.py import_projects file.json --dry-run

# Import new only
python manage.py import_projects file.json --skip-existing

# Import and update
python manage.py import_projects file.json --update
```

Start with the template, customize, dry-run, then import! 🚀
