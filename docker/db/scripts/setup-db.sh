#!/bin/bash

# ============================================================================
# Database Setup Script
# ============================================================================
#
# This script initializes the database for the LeasingMarkt application.
# It creates the necessary database and grants permissions to the user.
#
# Usage:
#   ./setup-db.sh
#
# Environment Variables (from .env):
#   DB_HOST       - Database host (default: db)
#   DB_PORT       - Database port (default: 3306)
#   DB_DATABASE   - Database name (default: leasingmarkt)
#   DB_USERNAME   - Database user (default: leasingmarkt)
#   DB_PASSWORD   - Database password
#
# ============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Load environment variables from .env file
if [ -f "../../../be/.env" ]; then
    export $(cat ../../../be/.env | grep -E '^DB_' | xargs)
fi

# Default values if not set
DB_HOST=${DB_HOST:-db}
DB_PORT=${DB_PORT:-3306}
DB_DATABASE=${DB_DATABASE:-leasingmarkt}
DB_USERNAME=${DB_USERNAME:-leasingmarkt}
DB_PASSWORD=${DB_PASSWORD:-password}
MYSQL_ROOT_PASSWORD=${MYSQL_ROOT_PASSWORD:-root_password}

echo -e "${BLUE}==>${NC} Setting up database..."
echo ""

# Wait for database to be ready
echo -e "${YELLOW}Waiting for database to be ready...${NC}"
MAX_RETRIES=30
RETRY_COUNT=0

until docker compose -f docker-compose.yml exec -T db mysqladmin ping -h localhost --silent 2>/dev/null || [ $RETRY_COUNT -eq $MAX_RETRIES ]; do
    RETRY_COUNT=$((RETRY_COUNT + 1))
    echo -e "${YELLOW}  Attempt $RETRY_COUNT/$MAX_RETRIES...${NC}"
    sleep 2
done

if [ $RETRY_COUNT -eq $MAX_RETRIES ]; then
    echo -e "${RED}ERROR: Database did not become ready in time!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Database is ready!${NC}"
echo ""

# Check if database exists
echo -e "${BLUE}==>${NC} Checking if database '${DB_DATABASE}' exists..."
DB_EXISTS=$(docker compose -f docker-compose.yml exec -T db mysql -uroot -p${MYSQL_ROOT_PASSWORD} -e "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME='${DB_DATABASE}';" --skip-column-names 2>/dev/null | grep -c "${DB_DATABASE}" || echo "0")

if [ "$DB_EXISTS" -eq "0" ]; then
    echo -e "${YELLOW}Database does not exist. Creating...${NC}"

    # Create database
    docker compose -f docker-compose.yml exec -T db mysql -uroot -p${MYSQL_ROOT_PASSWORD} <<-EOSQL
		CREATE DATABASE IF NOT EXISTS ${DB_DATABASE};
		GRANT ALL PRIVILEGES ON ${DB_DATABASE}.* TO '${DB_USERNAME}'@'%';
		FLUSH PRIVILEGES;
	EOSQL

    echo -e "${GREEN}✅ Database created successfully!${NC}"
else
    echo -e "${GREEN}✅ Database already exists!${NC}"
fi

echo ""
echo -e "${BLUE}Database Information:${NC}"
echo -e "  Host:     ${DB_HOST}"
echo -e "  Port:     ${DB_PORT}"
echo -e "  Database: ${DB_DATABASE}"
echo -e "  Username: ${DB_USERNAME}"
echo ""

# Run Laravel migrations if artisan is available
if [ -f "../../be/artisan" ]; then
    echo -e "${BLUE}==>${NC} Running Laravel migrations..."
    docker compose -f docker-compose.yml run --rm cli sh -c "php artisan migrate --force"
    echo -e "${GREEN}✅ Migrations completed!${NC}"
else
    echo -e "${YELLOW}Note: Laravel artisan not found. Skipping migrations.${NC}"
fi

echo ""
echo -e "${GREEN}✅ Database setup complete!${NC}"
