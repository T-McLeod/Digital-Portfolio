# Backend Setup Instructions

## Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

## Installation Steps

1. **Navigate to the backend directory:**
   ```powershell
   cd backend
   ```

2. **Create a virtual environment (recommended):**
   ```powershell
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   ```powershell
   .\venv\Scripts\Activate.ps1
   ```

4. **Install dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```

5. **Run migrations to create the database:**
   ```powershell
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Seed the database with sample data:**
   ```powershell
   python manage.py seed_data
   ```

7. **Create a superuser (optional, for admin access):**
   ```powershell
   python manage.py createsuperuser
   ```

8. **Start the development server:**
   ```powershell
   python manage.py runserver
   ```

The API will be available at `http://127.0.0.1:8000`

## API Endpoints

### Skills
- `GET /api/skills/` - List all skills
- `GET /api/skills/{id}/` - Get a specific skill

### Projects
- `GET /api/projects/` - List all projects
- `GET /api/projects/{id}/` - Get a specific project

### Experience
- `GET /api/experience/` - List all work experience
- `GET /api/experience/{id}/` - Get a specific experience item

## Admin Panel

Access the Django admin panel at `http://127.0.0.1:8000/admin/` after creating a superuser.

## Database Structure

### Models

#### Skill
- `id` (auto)
- `name` (CharField)
- `svg_icon` (TextField)

#### Project
- `id` (auto)
- `title` (CharField)
- `description` (TextField)
- `tags` (JSONField) - List of technology tags
- `image_url` (URLField)
- `live_url` (URLField, optional)
- `github_url` (URLField, optional)
- `is_ai_feature` (BooleanField)
- `skills` (ManyToManyField to Skill)
- `order` (IntegerField)

#### Experience
- `id` (auto)
- `company` (CharField)
- `role` (CharField)
- `period` (CharField)
- `description` (JSONField) - List of responsibilities
- `skills` (ManyToManyField to Skill)
- `order` (IntegerField)

## Development Notes

- SQLite database is used for development (db.sqlite3)
- CORS is configured to allow requests from `http://localhost:5173` (Vite dev server)
- All API endpoints are read-only (GET requests only)
- The frontend expects camelCase field names, which are handled by serializers
