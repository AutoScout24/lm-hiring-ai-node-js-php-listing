# ============================================================================
# LeasingMarkt - Application Management
# ============================================================================
#
# This Makefile provides convenient commands for managing both backend (Docker)
# and frontend (Node.js) services
#
# Usage:
#   make setup      # Setup both backend and frontend
#   make run        # Run both services
#   make help       # Show all available commands
#
# ============================================================================

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
BLUE := \033[0;34m
NC := \033[0m # No Color

# Project directories
DOCKER_COMPOSE_FILE := docker/docker-compose.yml
FE_DIR := fe

# Node package manager (change to yarn if preferred)
NPM := npm

# Load environment variables from .env file if it exists
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

# Set default port values if not defined in .env
BACKEND_PORT ?= 80
DB_PORT ?= 3306
FE_PORT ?= 3000

# ============================================================================
# Helper targets
# ============================================================================

.PHONY: help
help: ## Show this help message
	@echo "$(GREEN)LeasingMarkt - Application Management$(NC)"
	@echo ""
	@echo "$(BLUE)Available commands:$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-20s$(NC) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(BLUE)Quick Start:$(NC)"
	@echo "  make setup              # Setup both backend and frontend"
	@echo "  make run                # Run both services"
	@echo ""
	@echo "$(BLUE)Examples:$(NC)"
	@echo "  make setup-be           # Setup backend only"
	@echo "  make setup-fe           # Setup frontend only"
	@echo "  make run-be             # Run backend only"
	@echo "  make run-fe             # Run frontend only"
	@echo "  make run-db             # Run database only"
	@echo "  make setup-db           # Initialize database"
	@echo "  make bash-db            # Access database CLI"
	@echo "  make bash-be            # Access BE CLI"
	@echo "  make logs-backend       # View backend logs"
	@echo "  make logs-db            # View database logs"
	@echo "  make down               # Stop all services"
	@echo ""

# ============================================================================
# Setup commands
# ============================================================================

.PHONY: setup-env
setup-env: ## Copy .env.example files if .env files don't exist
	@echo "$(BLUE)==>$(NC) Checking environment files..."
	@cp -n .env.example .env 2>/dev/null || true
	@cp -n be/.env.example be/.env 2>/dev/null || true
	@cp -n fe/.env.example fe/.env.local 2>/dev/null || true
	@echo "$(GREEN)✅ Environment files ready!$(NC)"

.PHONY: setup
setup: setup-env network-create run-db setup-be setup-db build-fe ## Setup both backend and frontend
	@echo ""
	@echo "$(GREEN)✅ Full setup complete!$(NC)"
	@echo ""
	@echo "$(BLUE)Service Information:$(NC)"
	@echo "  • Backend accessible at: http://localhost:$(BACKEND_PORT)"
	@echo "  • Frontend accessible at: http://localhost:$(FE_PORT)"
	@echo "  • Database accessible at: localhost:$(DB_PORT)"
	@echo ""
	@echo "$(BLUE)Next steps:$(NC)"
	@echo "  • Run 'make run' to start both services"
	@echo ""

.PHONY: setup-be
setup-be: ## Setup backend (Docker network and build images)
	@echo "$(BLUE)==>$(NC) Setting up backend..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) build
	@echo "$(BLUE)==>$(NC) Preparing vendor directory..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) run --rm --user root cli -c "mkdir -p /var/www/html/vendor && chown www-data:www-data /var/www/html/vendor"
	@echo "$(BLUE)==>$(NC) Installing composer dependencies..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) run --rm cli -c "composer install && php artisan l5-swagger:generate"
	@echo "$(GREEN)✅ Backend setup complete!$(NC)"

.PHONY: setup-fe
setup-fe: ## Setup frontend (build image and install dependencies)
	@echo "$(BLUE)==>$(NC) Setting up frontend..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) build frontend
	@echo "$(GREEN)✅ Frontend setup complete!$(NC)"

.PHONY: build-fe
build-fe: ## Install frontend dependencies
	@echo "$(BLUE)==>$(NC) Installing frontend dependencies..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) run --rm frontend npm install
	@echo "$(GREEN)✅ Frontend dependencies installed!$(NC)"

# ============================================================================
# Run commands
# ============================================================================

.PHONY: run
run: ## Run all services (backend, frontend, database)
	@echo "$(GREEN)Starting LeasingMarkt Application$(NC)"
	@echo ""
	@echo "$(YELLOW)⚠️  Press Ctrl+C to stop.$(NC)"
	@echo ""
	@echo "$(BLUE)Backend accessible at:$(NC) http://localhost:$(BACKEND_PORT)"
	@echo "$(BLUE)Frontend accessible at:$(NC) http://localhost:$(FE_PORT)"
	@echo ""
	@docker compose -f $(DOCKER_COMPOSE_FILE) up

.PHONY: run-be
run-be: ## Run backend service only (Docker)
	@echo "$(BLUE)==>$(NC) Starting backend services..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) up -d backend db
	@echo ""
	@echo "$(GREEN)✅ Backend started successfully!$(NC)"
	@echo ""
	@echo "$(BLUE)Running services:$(NC)"
	@docker compose -f $(DOCKER_COMPOSE_FILE) ps
	@echo ""
	@echo "$(BLUE)Backend accessible at:$(NC) http://localhost:$(BACKEND_PORT)"
	@echo ""

.PHONY: run-fe
run-fe: ## Run frontend service only (Docker)
	@echo "$(BLUE)==>$(NC) Starting frontend development server..."
	@echo "$(BLUE)Frontend will be accessible at:$(NC) http://localhost:$(FE_PORT)"
	@echo ""
	@docker compose -f $(DOCKER_COMPOSE_FILE) up frontend

# ============================================================================
# Service management
# ============================================================================

.PHONY: down
down: ## Stop and remove all services
	@echo "$(BLUE)==>$(NC) Stopping all services..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) down
	@echo "$(GREEN)✅ All services stopped successfully!$(NC)"

.PHONY: restart
restart: ## Restart backend services
	@echo "$(BLUE)==>$(NC) Restarting backend services..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) restart
	@echo "$(GREEN)✅ Backend services restarted successfully!$(NC)"

.PHONY: stop
stop: ## Stop backend services without removing them
	@echo "$(BLUE)==>$(NC) Stopping backend services..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) stop
	@echo "$(GREEN)✅ Backend services stopped!$(NC)"

.PHONY: start
start: ## Start previously stopped backend services
	@echo "$(BLUE)==>$(NC) Starting backend services..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) start
	@echo "$(GREEN)✅ Backend services started!$(NC)"

# ============================================================================
# Service information
# ============================================================================

.PHONY: status
status: ## Show status of backend services
	@echo "$(BLUE)==>$(NC) Backend service status:"
	@docker compose -f $(DOCKER_COMPOSE_FILE) ps

.PHONY: logs
logs: ## View logs from backend services (follow mode)
	@docker compose -f $(DOCKER_COMPOSE_FILE) logs -f

.PHONY: logs-backend
logs-backend: ## View logs from backend service only
	@docker compose -f $(DOCKER_COMPOSE_FILE) logs -f backend

.PHONY: logs-db
logs-db: ## View logs from database service only
	@docker compose -f $(DOCKER_COMPOSE_FILE) logs -f db

.PHONY: logs-fe
logs-fe: ## View logs from frontend service only
	@docker compose -f $(DOCKER_COMPOSE_FILE) logs -f frontend

# ============================================================================
# Maintenance
# ============================================================================

.PHONY: build
build: ## Build or rebuild backend Docker images
	@echo "$(BLUE)==>$(NC) Building backend Docker images..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) build
	@echo "$(GREEN)✅ Build complete!$(NC)"

.PHONY: pull
pull: ## Pull latest backend Docker images
	@echo "$(BLUE)==>$(NC) Pulling latest backend Docker images..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) pull
	@echo "$(GREEN)✅ Pull complete!$(NC)"

.PHONY: clean
clean: down ## Stop backend services and clean up volumes
	@echo "$(YELLOW)⚠️  This will remove all Docker volumes and data!$(NC)"
	@read -p "Are you sure? (y/N): " confirm; \
	if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
		echo "$(BLUE)==>$(NC) Cleaning up volumes..."; \
		docker compose -f $(DOCKER_COMPOSE_FILE) down -v; \
		echo "$(GREEN)✅ Cleanup complete!$(NC)"; \
	else \
		echo "$(RED)Cleanup canceled!$(NC)"; \
	fi

.PHONY: clean-fe
clean-fe: ## Clean frontend node_modules and build artifacts
	@echo "$(YELLOW)⚠️  This will remove node_modules and build artifacts!$(NC)"
	@read -p "Are you sure? (y/N): " confirm; \
	if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
		echo "$(BLUE)==>$(NC) Cleaning frontend..."; \
		if [ -d "$(FE_DIR)/node_modules" ]; then rm -rf $(FE_DIR)/node_modules; fi; \
		if [ -d "$(FE_DIR)/.next" ]; then rm -rf $(FE_DIR)/.next; fi; \
		echo "$(GREEN)✅ Frontend cleanup complete!$(NC)"; \
	else \
		echo "$(RED)Cleanup canceled!$(NC)"; \
	fi

.PHONY: clean-all
clean-all: clean clean-fe ## Clean both backend and frontend
	@echo "$(GREEN)✅ Full cleanup complete!$(NC)"

# ============================================================================
# Development helpers
# ============================================================================

.PHONY: bash-be
bash-be: ## Open an interactive shell in the CLI container
	@echo "$(BLUE)==>$(NC) Starting interactive shell session..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) run --rm cli

.PHONY: network-create
network-create: ## Create the leasingmarkt network if it doesn't exist
	@echo "$(BLUE)==>$(NC) Creating leasingmarkt network..."
	@docker network create leasingmarkt 2>/dev/null || echo "$(YELLOW)Network already exists$(NC)"
	@echo "$(GREEN)✅ Network ready!$(NC)"

# ============================================================================
# Database management
# ============================================================================

.PHONY: run-db
run-db: ## Start database service only
	@echo "$(BLUE)==>$(NC) Starting database service..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) up -d db
	@echo ""
	@echo "$(GREEN)✅ Database started successfully!$(NC)"
	@echo ""
	@echo "$(BLUE)Database accessible at:$(NC) localhost:$(DB_PORT)"
	@echo "$(BLUE)Database name:$(NC) leasingmarkt"
	@echo "$(BLUE)Username:$(NC) leasingmarkt"
	@echo ""

.PHONY: setup-db
setup-db: ## Setup and initialize database (run migrations and seeders)
	@echo "$(BLUE)==>$(NC) Setting up database..."
	@if [ ! -f "docker/db/scripts/setup-db.sh" ]; then \
		echo "$(RED)ERROR: Database setup script not found!$(NC)"; \
		exit 1; \
	fi
	@echo "$(BLUE)==>$(NC) Waiting for database to be ready..."
	@DB_READY=0; \
	for i in 1 2 3 4 5 6 7 8 9 10 11 12; do \
		if docker compose -f $(DOCKER_COMPOSE_FILE) run --rm cli -c "php -r \"try { new PDO('mysql:host=db;dbname=leasingmarkt', 'leasingmarkt', 'password'); exit(0); } catch (Exception \$$e) { exit(1); }\"" >/dev/null 2>&1; then \
			echo "$(GREEN)✅ Database is ready and accepting connections from CLI!$(NC)"; \
			DB_READY=1; \
			break; \
		else \
			echo "$(YELLOW)Waiting for database... ($$i/12)$(NC)"; \
			sleep 5; \
		fi; \
	done; \
	if [ $$DB_READY -eq 0 ]; then \
		echo "$(RED)ERROR: Database failed to become ready after 60 seconds!$(NC)"; \
		exit 1; \
	fi
	@echo "$(BLUE)==>$(NC) Running migrations and seeders..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) run --rm cli -c "php artisan migrate:fresh --force && php artisan db:seed --force"
	@echo "$(GREEN)✅ Database setup complete!$(NC)"

.PHONY: bash-db
bash-db: ## Access database CLI (MariaDB shell)
	@echo "$(BLUE)==>$(NC) Connecting to database..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) exec db mysql -uleasingmarkt -ppassword leasingmarkt

.PHONY: reset-db
reset-db: ## Reset database (drop and recreate)
	@echo "$(YELLOW)⚠️  This will drop all database data!$(NC)"
	@read -p "Are you sure? (y/N): " confirm; \
	if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
		echo "$(BLUE)==>$(NC) Resetting database..."; \
		docker compose -f $(DOCKER_COMPOSE_FILE) exec db mysql -uroot -proot_password -e "DROP DATABASE IF EXISTS leasingmarkt; CREATE DATABASE leasingmarkt;"; \
		docker compose -f $(DOCKER_COMPOSE_FILE) exec db mysql -uroot -proot_password -e "GRANT ALL PRIVILEGES ON leasingmarkt.* TO 'leasingmarkt'@'%';"; \
		echo "$(GREEN)✅ Database reset complete!$(NC)"; \
	else \
		echo "$(RED)Reset canceled!$(NC)"; \
	fi

# ============================================================================
# Default target
# ============================================================================

.DEFAULT_GOAL := help
