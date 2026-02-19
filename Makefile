# ============================================================================
# LeasingMarkt - Docker Services Management
# ============================================================================
#
# This Makefile provides convenient commands for managing Docker services
# defined in docker/docker-compose.yml
#
# Usage:
#   make setup      # Start all services
#   make help       # Show all available commands
#
# ============================================================================

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
BLUE := \033[0;34m
NC := \033[0m # No Color

# Docker Compose file location
DOCKER_COMPOSE_FILE := docker/docker-compose.yml

# ============================================================================
# Helper targets
# ============================================================================

.PHONY: help
help: ## Show this help message
	@echo "$(GREEN)LeasingMarkt - Docker Services Management$(NC)"
	@echo ""
	@echo "$(BLUE)Available commands:$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-15s$(NC) %s\n", $$1, $$2}'
	@echo ""
	@echo "$(BLUE)Examples:$(NC)"
	@echo "  make setup              # Start all services"
	@echo "  make logs               # View logs from all services"
	@echo "  make logs-backend       # View logs from backend service only"
	@echo "  make down               # Stop and remove all services"
	@echo ""

# ============================================================================
# Service management
# ============================================================================

.PHONY: setup
setup: ## Start all Docker services
	@echo "$(BLUE)==>$(NC) Starting Docker services..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) up -d
	@echo ""
	@echo "$(GREEN)✅ Services started successfully!$(NC)"
	@echo ""
	@echo "$(BLUE)Running services:$(NC)"
	@docker compose -f $(DOCKER_COMPOSE_FILE) ps
	@echo ""
	@echo "$(BLUE)Backend accessible at:$(NC) http://localhost:80"
	@echo ""

.PHONY: down
down: ## Stop and remove all services
	@echo "$(BLUE)==>$(NC) Stopping Docker services..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) down
	@echo "$(GREEN)✅ Services stopped successfully!$(NC)"

.PHONY: restart
restart: ## Restart all services
	@echo "$(BLUE)==>$(NC) Restarting Docker services..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) restart
	@echo "$(GREEN)✅ Services restarted successfully!$(NC)"

.PHONY: stop
stop: ## Stop services without removing them
	@echo "$(BLUE)==>$(NC) Stopping Docker services..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) stop
	@echo "$(GREEN)✅ Services stopped!$(NC)"

.PHONY: start
start: ## Start previously stopped services
	@echo "$(BLUE)==>$(NC) Starting Docker services..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) start
	@echo "$(GREEN)✅ Services started!$(NC)"

# ============================================================================
# Service information
# ============================================================================

.PHONY: status
status: ## Show status of all services
	@echo "$(BLUE)==>$(NC) Service status:"
	@docker compose -f $(DOCKER_COMPOSE_FILE) ps

.PHONY: logs
logs: ## View logs from all services (follow mode)
	@docker compose -f $(DOCKER_COMPOSE_FILE) logs -f

.PHONY: logs-backend
logs-backend: ## View logs from backend service only
	@docker compose -f $(DOCKER_COMPOSE_FILE) logs -f backend

# ============================================================================
# Maintenance
# ============================================================================

.PHONY: build
build: ## Build or rebuild services
	@echo "$(BLUE)==>$(NC) Building Docker images..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) build
	@echo "$(GREEN)✅ Build complete!$(NC)"

.PHONY: pull
pull: ## Pull latest images
	@echo "$(BLUE)==>$(NC) Pulling latest Docker images..."
	@docker compose -f $(DOCKER_COMPOSE_FILE) pull
	@echo "$(GREEN)✅ Pull complete!$(NC)"

.PHONY: clean
clean: down ## Stop services and clean up volumes
	@echo "$(YELLOW)⚠️  This will remove all volumes and data!$(NC)"
	@read -p "Are you sure? (y/N): " confirm; \
	if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
		echo "$(BLUE)==>$(NC) Cleaning up volumes..."; \
		docker compose -f $(DOCKER_COMPOSE_FILE) down -v; \
		echo "$(GREEN)✅ Cleanup complete!$(NC)"; \
	else \
		echo "$(RED)Cleanup canceled!$(NC)"; \
	fi

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
