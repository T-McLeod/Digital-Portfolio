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

echo "Starting server..."
exec python manage.py runserver 0.0.0.0:8000
