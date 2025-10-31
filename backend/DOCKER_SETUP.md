# Portfolio Backend - Docker Setup

This Django backend can run as a Docker container with support for both SQLite (development) and PostgreSQL (production).

## Quick Start

### 1. Create Environment File

Copy the example environment file and customize it:

```bash
cp .env.example .env
```

Edit `.env` with your specific settings.

### 2. Run with Docker Compose (PostgreSQL)

```bash
# Build and start containers
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f web

# Stop containers
docker-compose down

# Stop and remove volumes (WARNING: deletes database)
docker-compose down -v
```

### 3. Run with Docker (SQLite)

```bash
# Build the image
docker build -t portfolio-backend .

# Run the container
docker run -p 8000:8000 \
  -v $(pwd)/media:/app/media \
  -e DEBUG=True \
  -e DB_ENGINE=sqlite3 \
  portfolio-backend
```

## Environment Variables

### Required Variables

- `SECRET_KEY` - Django secret key (generate a new one for production)
- `DEBUG` - Set to `False` in production
- `ALLOWED_HOSTS` - Comma-separated list of allowed hosts

### Database Variables

**For SQLite (Development):**
- `DB_ENGINE=sqlite3`
- `DB_NAME=db.sqlite3`

**For PostgreSQL (Production):**
- `DB_ENGINE=postgresql`
- `DB_NAME` - Database name
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `DB_HOST` - Database host (use `db` in docker-compose)
- `DB_PORT` - Database port (default: 5432)

### CORS Variables

- `CORS_ALLOWED_ORIGINS` - Comma-separated list of allowed origins
- `CSRF_TRUSTED_ORIGINS` - Comma-separated list of trusted origins

## Database Management

### Create Superuser

```bash
# With docker-compose
docker-compose exec web python manage.py createsuperuser

# With docker run
docker exec -it <container_id> python manage.py createsuperuser
```

### Run Migrations

Migrations run automatically on container start. To run manually:

```bash
# With docker-compose
docker-compose exec web python manage.py migrate

# With docker run
docker exec -it <container_id> python manage.py migrate
```

### Bulk Import Projects

```bash
# With docker-compose
docker-compose exec web python manage.py import_projects /app/your_file.json

# With docker run
docker exec -it <container_id> python manage.py import_projects /app/your_file.json
```

## Volumes

The docker-compose setup creates three volumes:

- `postgres_data` - PostgreSQL database data (persistent)
- `media_volume` - User-uploaded media files
- `static_volume` - Static files (CSS, JS, etc.)

## Switching from SQLite to PostgreSQL

1. **Export your data** (if you have existing data):
   ```bash
   python manage.py dumpdata > data.json
   ```

2. **Update .env file**:
   ```bash
   DB_ENGINE=postgresql
   DB_NAME=portfolio_db
   DB_USER=portfolio_user
   DB_PASSWORD=your_secure_password
   DB_HOST=db
   DB_PORT=5432
   ```

3. **Start with docker-compose**:
   ```bash
   docker-compose up --build
   ```

4. **Import your data** (if you exported it):
   ```bash
   docker-compose exec web python manage.py loaddata data.json
   ```

## Production Considerations

1. **Generate a secure SECRET_KEY**:
   ```python
   python -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
   ```

2. **Set security variables in .env**:
   ```bash
   DEBUG=False
   SECRET_KEY=your-generated-secret-key
   CSRF_COOKIE_SECURE=True
   SESSION_COOKIE_SECURE=True
   ```

3. **Update ALLOWED_HOSTS** with your domain:
   ```bash
   ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com
   ```

4. **Use a reverse proxy** (nginx, traefik) for SSL termination

5. **Regular backups** of the PostgreSQL database:
   ```bash
   docker-compose exec db pg_dump -U portfolio_user portfolio_db > backup.sql
   ```

## Troubleshooting

### Container won't start
- Check logs: `docker-compose logs web`
- Verify environment variables in `.env`
- Ensure database is ready: `docker-compose logs db`

### Can't connect to database
- Verify `DB_HOST` is set to `db` in docker-compose
- Check if database container is healthy: `docker-compose ps`
- Wait a few seconds for database initialization

### Permission errors
- Ensure media and staticfiles directories have correct permissions
- May need to adjust volume mounts on Windows/WSL

### Port already in use
- Change port mapping in docker-compose.yml: `"8001:8000"`
- Or stop the conflicting service

## API Endpoints

Once running, the API will be available at:

- **Base URL**: http://localhost:8000/api/
- **Admin Panel**: http://localhost:8000/admin/
- **Skills**: http://localhost:8000/api/skills/
- **Projects**: http://localhost:8000/api/projects/
- **Experiences**: http://localhost:8000/api/experiences/

## Development vs Production

### Development Setup (SQLite)
- Fast setup, no database server needed
- Good for local development and testing
- Use `.env` with `DB_ENGINE=sqlite3`

### Production Setup (PostgreSQL)
- Better performance and scalability
- ACID compliance and better concurrency
- Use docker-compose with PostgreSQL service
- Set `DB_ENGINE=postgresql` in `.env`
