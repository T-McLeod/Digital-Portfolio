# Docker Compose Development Quick Reference

## Quick Commands

### Start Everything (PostgreSQL)
```bash
docker-compose up -d
```

### View Logs
```bash
docker-compose logs -f web
```

### Create Superuser
```bash
docker-compose exec web python manage.py createsuperuser
```

### Import Projects
```bash
docker-compose exec web python manage.py import_projects test_import.json
```

### Stop Everything
```bash
docker-compose down
```

## Development Workflow

### 1. First Time Setup
```bash
# Copy environment file
cp .env.example .env

# Edit .env with your settings (optional for development)

# Build and start containers
docker-compose up --build
```

### 2. Daily Development
```bash
# Start containers
docker-compose up -d

# Check logs
docker-compose logs -f web

# Create superuser (first time only)
docker-compose exec web python manage.py createsuperuser

# Access admin at http://localhost:8000/admin
```

### 3. Making Changes

When you edit Python files, the development server will auto-reload.

If you change models:
```bash
docker-compose exec web python manage.py makemigrations
docker-compose exec web python manage.py migrate
```

### 4. Switching Databases

**SQLite (Faster for development):**
1. Edit `.env`:
   ```
   DB_ENGINE=sqlite3
   DB_NAME=db.sqlite3
   ```
2. Restart: `docker-compose down && docker-compose up -d`

**PostgreSQL (Production-like):**
1. Edit `.env`:
   ```
   DB_ENGINE=postgresql
   DB_NAME=portfolio_db
   DB_USER=portfolio_user
   DB_PASSWORD=changeme
   ```
2. Restart: `docker-compose down && docker-compose up -d`

## Troubleshooting

### Can't connect to database
```bash
# Check database health
docker-compose ps

# View database logs
docker-compose logs db

# Restart everything
docker-compose restart
```

### Port 8000 already in use
```bash
# Change port in docker-compose.yml:
ports:
  - "8001:8000"  # Use 8001 instead

# Or stop the other service:
# Find process: netstat -ano | findstr :8000
# Kill it: taskkill /PID <process_id> /F
```

### Reset everything
```bash
# WARNING: This deletes all data!
docker-compose down -v
docker-compose up --build
```

## Access Points

- **API**: http://localhost:8000/api/
- **Admin**: http://localhost:8000/admin/
- **Media Files**: http://localhost:8000/media/
- **PostgreSQL**: localhost:5432 (if using PostgreSQL)

## Environment Variables

See `.env.example` for all available variables.

Key ones:
- `DEBUG=True` - Enable debug mode
- `DB_ENGINE` - `sqlite3` or `postgresql`
- `SECRET_KEY` - Django secret key (generate new for production)
