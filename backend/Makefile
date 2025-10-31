.PHONY: help build up down logs shell migrate createsuperuser test import clean

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  %-20s %s\n", $$1, $$2}'

build: ## Build Docker containers
	docker-compose build

up: ## Start containers (PostgreSQL)
	docker-compose up -d
	@echo "Backend running at http://localhost:8000"

up-logs: ## Start containers with logs
	docker-compose up

down: ## Stop containers
	docker-compose down

logs: ## View logs
	docker-compose logs -f web

logs-db: ## View database logs
	docker-compose logs -f db

shell: ## Open Django shell
	docker-compose exec web python manage.py shell

bash: ## Open bash shell in container
	docker-compose exec web bash

migrate: ## Run database migrations
	docker-compose exec web python manage.py migrate

makemigrations: ## Create new migrations
	docker-compose exec web python manage.py makemigrations

createsuperuser: ## Create a superuser
	docker-compose exec web python manage.py createsuperuser

import: ## Import projects from JSON file (usage: make import FILE=projects.json)
	docker-compose exec web python manage.py import_projects $(FILE)

test: ## Run tests
	docker-compose exec web python manage.py test

collectstatic: ## Collect static files
	docker-compose exec web python manage.py collectstatic --noinput

clean: ## Remove containers and volumes
	docker-compose down -v

restart: ## Restart containers
	docker-compose restart

rebuild: ## Rebuild and restart containers
	docker-compose down
	docker-compose build
	docker-compose up -d

backup: ## Backup PostgreSQL database
	docker-compose exec db pg_dump -U portfolio_user portfolio_db > backup_$(shell date +%Y%m%d_%H%M%S).sql

restore: ## Restore PostgreSQL database (usage: make restore FILE=backup.sql)
	docker-compose exec -T db psql -U portfolio_user portfolio_db < $(FILE)
