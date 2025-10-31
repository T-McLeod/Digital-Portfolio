# Test script to verify Docker setup (PowerShell)

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Django Backend Docker Setup Test" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is installed
Write-Host "Checking Docker installation..." -ForegroundColor Green
$dockerCheck = Get-Command docker -ErrorAction SilentlyContinue
if (-Not $dockerCheck) {
    Write-Host "  ERROR: Docker is not installed. Please install Docker Desktop first." -ForegroundColor Red
    exit 1
}
$dockerVersion = docker --version
Write-Host "  OK: Docker version: $dockerVersion" -ForegroundColor Gray
Write-Host ""

# Check if Docker Compose is installed
Write-Host "Checking Docker Compose installation..." -ForegroundColor Green
$composeCheck = Get-Command docker-compose -ErrorAction SilentlyContinue
if (-Not $composeCheck) {
    Write-Host "  ERROR: Docker Compose is not installed." -ForegroundColor Red
    exit 1
}
$composeVersion = docker-compose --version
Write-Host "  OK: Docker Compose version: $composeVersion" -ForegroundColor Gray
Write-Host ""

# Check if .env file exists
Write-Host "Checking .env file..." -ForegroundColor Green
if (-Not (Test-Path .env)) {
    Write-Host "  WARNING: .env file not found. Creating from .env.example..." -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host "  OK: Created .env file. Please review and update values if needed." -ForegroundColor Green
}
else {
    Write-Host "  OK: .env file exists" -ForegroundColor Gray
}
Write-Host ""

# Check for required files
Write-Host "Checking required files..." -ForegroundColor Green
$files = @(
    "Dockerfile",
    "docker-compose.yml",
    "docker-entrypoint.sh",
    ".dockerignore",
    ".env.example",
    "requirements.txt",
    "manage.py"
)

$allFilesExist = $true
foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "  OK: $file exists" -ForegroundColor Gray
    }
    else {
        Write-Host "  ERROR: $file is missing" -ForegroundColor Red
        $allFilesExist = $false
    }
}
Write-Host ""

if (-Not $allFilesExist) {
    Write-Host "Some required files are missing. Please check the setup." -ForegroundColor Red
    exit 1
}

# Test docker-compose configuration
Write-Host "Testing docker-compose configuration..." -ForegroundColor Green
$composeOutput = docker-compose config 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  OK: docker-compose.yml is valid" -ForegroundColor Gray
}
else {
    Write-Host "  ERROR: docker-compose.yml has errors" -ForegroundColor Red
    Write-Host $composeOutput -ForegroundColor Red
    exit 1
}
Write-Host ""

# Summary
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "All checks passed!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Review and update .env file if needed"
Write-Host "2. Run: docker-compose up --build"
Write-Host "3. Create superuser: docker-compose exec web python manage.py createsuperuser"
Write-Host "4. Access admin: http://localhost:8000/admin"
Write-Host ""
Write-Host "For more information, see DOCKER_SETUP.md" -ForegroundColor Cyan
