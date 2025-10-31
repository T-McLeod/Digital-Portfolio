#!/bin/bash
# Test script to verify Docker setup

echo "======================================"
echo "Django Backend Docker Setup Test"
echo "======================================"
echo ""

# Check if Docker is installed
echo "✓ Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "✗ Docker is not installed. Please install Docker first."
    exit 1
fi
echo "  Docker version: $(docker --version)"
echo ""

# Check if Docker Compose is installed
echo "✓ Checking Docker Compose installation..."
if ! command -v docker-compose &> /dev/null; then
    echo "✗ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi
echo "  Docker Compose version: $(docker-compose --version)"
echo ""

# Check if .env file exists
echo "✓ Checking .env file..."
if [ ! -f .env ]; then
    echo "  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "  ✓ Created .env file. Please review and update values if needed."
else
    echo "  ✓ .env file exists"
fi
echo ""

# Test Docker build
echo "✓ Testing Docker build..."
if docker build -t portfolio-backend-test . > /dev/null 2>&1; then
    echo "  ✓ Docker image builds successfully"
else
    echo "  ✗ Docker build failed. Check Dockerfile for errors."
    exit 1
fi
echo ""

# Test docker-compose configuration
echo "✓ Testing docker-compose configuration..."
if docker-compose config > /dev/null 2>&1; then
    echo "  ✓ docker-compose.yml is valid"
else
    echo "  ✗ docker-compose.yml has errors"
    exit 1
fi
echo ""

# Check for required files
echo "✓ Checking required files..."
files=(
    "Dockerfile"
    "docker-compose.yml"
    "docker-entrypoint.sh"
    ".dockerignore"
    ".env.example"
    "requirements.txt"
    "manage.py"
)

all_files_exist=true
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file exists"
    else
        echo "  ✗ $file is missing"
        all_files_exist=false
    fi
done
echo ""

if [ "$all_files_exist" = false ]; then
    echo "Some required files are missing. Please check the setup."
    exit 1
fi

# Summary
echo "======================================"
echo "✓ All checks passed!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Review and update .env file if needed"
echo "2. Run: docker-compose up --build"
echo "3. Create superuser: docker-compose exec web python manage.py createsuperuser"
echo "4. Access admin: http://localhost:8000/admin"
echo ""
echo "For more information, see DOCKER_SETUP.md"
