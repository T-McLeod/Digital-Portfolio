#!/bin/bash
set -e

# Function to wait for database
wait_for_db() {
  echo "Waiting for database..."
  
  # If PostgreSQL, wait for it
  if [ "$DB_ENGINE" = "postgresql" ]; then
    while ! nc -z $DB_HOST $DB_PORT 2>/dev/null; do
      sleep 0.1
    done
    echo "PostgreSQL is ready!"
  else
    echo "Using SQLite, no wait needed."
  fi
}

# Wait for database if needed
wait_for_db

echo "Running migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

# Use PORT env var (Cloud Run sets this), default to 8000
PORT="${PORT:-8000}"

echo "Starting server on port $PORT..."
exec gunicorn portfolio_project.wsgi:application \
  --bind 0.0.0.0:$PORT \
  --workers 2 \
  --threads 4 \
  --timeout 120 \
  --access-logfile - \
  --error-logfile -
