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
	@echo "  make logs-backend       # View backend logs"
	@echo "  make down               # Stop all services"
	@echo ""

# ============================================================================
# Setup commands
# ============================================================================

.PHONY: setup
setup: network-create setup-be setup-fe ## Setup both backend and frontend
	@echo ""
	@echo "$(GREEN)✅ Full setup complete!$(NC)"
	@echo ""
	@echo "$(BLUE)Next steps:$(NC)"
	@echo "  • Run 'make run' to start both services"
	@echo "  • Backend will be accessible at: http://localhost:80"
	@echo "  • Frontend will be accessible at: http://localhost:3000"
	@echo ""

.PHONY: setup-be
setup-be: ## Setup backend (Docker network and build images)
	@echo "$(BLUE)==>$(NC) Setting up backend..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) build
	@echo "$(GREEN)✅ Backend setup complete!$(NC)"

.PHONY: setup-fe
setup-fe: ## Setup frontend (install Node.js dependencies)
	@echo "$(BLUE)==>$(NC) Setting up frontend..."
	@if [ ! -d "$(FE_DIR)" ]; then \
		echo "$(RED)ERROR: Frontend directory '$(FE_DIR)' not found!$(NC)"; \
		exit 1; \
	fi
	@cd $(FE_DIR) && $(NPM) install
	@echo "$(GREEN)✅ Frontend setup complete!$(NC)"

# ============================================================================
# Run commands
# ============================================================================

.PHONY: run
run: ## Run both backend and frontend services
	@echo "$(GREEN)Starting LeasingMarkt Application$(NC)"
	@echo ""
	@echo "$(YELLOW)⚠️  This will run both services. Press Ctrl+C to stop.$(NC)"
	@echo ""
	@echo "$(BLUE)==>$(NC) Starting backend (Docker)..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) up -d
	@echo "$(GREEN)✅ Backend started!$(NC)"
	@echo "$(BLUE)Backend accessible at:$(NC) http://localhost:80"
	@echo ""
	@echo "$(BLUE)==>$(NC) Starting frontend (Node.js)..."
	@echo "$(BLUE)Frontend will be accessible at:$(NC) http://localhost:3000"
	@echo ""
	@cd $(FE_DIR) && $(NPM) run dev

.PHONY: run-be
run-be: ## Run backend service only (Docker)
	@echo "$(BLUE)==>$(NC) Starting backend services..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) up -d
	@echo ""
	@echo "$(GREEN)✅ Backend started successfully!$(NC)"
	@echo ""
	@echo "$(BLUE)Running services:$(NC)"
	@docker compose -f $(DOCKER_COMPOSE_FILE) ps
	@echo ""
	@echo "$(BLUE)Backend accessible at:$(NC) http://localhost:80"
	@echo ""

.PHONY: run-fe
run-fe: ## Run frontend service only (Node.js dev server)
	@echo "$(BLUE)==>$(NC) Starting frontend development server..."
	@if [ ! -d "$(FE_DIR)" ]; then \
		echo "$(RED)ERROR: Frontend directory '$(FE_DIR)' not found!$(NC)"; \
		exit 1; \
	fi
	@if [ ! -d "$(FE_DIR)/node_modules" ]; then \
		echo "$(YELLOW)⚠️  Dependencies not installed. Running setup-fe first...$(NC)"; \
		$(MAKE) setup-fe; \
	fi
	@echo "$(BLUE)Frontend will be accessible at:$(NC) http://localhost:3000"
	@echo ""
	@cd $(FE_DIR) && $(NPM) run dev

# ============================================================================
# Service management
# ============================================================================

.PHONY: down
down: ## Stop and remove all backend services
	@echo "$(BLUE)==>$(NC) Stopping backend services..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) down
	@echo "$(GREEN)✅ Backend services stopped successfully!$(NC)"
	@echo ""
	@echo "$(YELLOW)Note:$(NC) Frontend server must be stopped manually (Ctrl+C) if running"

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

.PHONY: logs-fe
logs-fe: ## View frontend logs (if running in background)
	@echo "$(YELLOW)Frontend logs are shown in the terminal where 'make run' or 'make run-fe' was executed$(NC)"

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

.PHONY: shell-backend
shell-backend: ## Open an interactive shell in the CLI container
	@echo "$(BLUE)==>$(NC) Starting interactive shell session..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) run --rm cli

.PHONY: network-create
network-create: ## Create the leasingmarkt network if it doesn't exist
	@echo "$(BLUE)==>$(NC) Creating leasingmarkt network..."
	@docker network create leasingmarkt 2>/dev/null || echo "$(YELLOW)Network already exists$(NC)"
	@echo "$(GREEN)✅ Network ready!$(NC)"

# ============================================================================
# Default target
# ============================================================================

.DEFAULT_GOAL := help
