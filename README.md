# LeasingMarkt Hiring Assessment - Full Stack Listing Application

A modern, responsive car listing application that demonstrates a production-ready architecture with separated frontend and backend services, similar to the LeasingMarkt platform.

## 🎯 Purpose

This project is designed as an **interview assessment task** to evaluate candidates on:

- **Problem-solving skills**: Understanding and navigating an existing codebase
- **AI-assisted development**: Using AI tools to comprehend project structure and implement features
- **Full-stack coding abilities**: Working with both Next.js (React) and PHP (Laravel)
- **API integration**: Connecting frontend applications with backend services
- **Best practices**: Following modern web development patterns

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ and npm
- Make (optional, for convenience commands)

### 1. Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd lm-hiring-ai-node-js-php-listing

# Configure port settings (optional)
# Edit .env to customize ports if needed (default: BE=80, DB=3306, FE=3000)
cp .env.example .env
cp be/.env.example .env
cp fe/.env.example .env.local
# Ensure all .env have the ports in sync

# One script setup
make setup

# One script to run
make run
```

### 2. Start Development Servers

**Option A: Using Make commands (recommended)**

```bash
# Terminal 1: Start backend
make run-be

# Terminal 2: Start frontend
make run-fe
```

**Option B: Manual commands**

```bash
# Terminal 1: Backend
cd docker && docker-compose up

# Terminal 2: Frontend
cd fe && npm run dev
```

### 3. Access the Applications

- **Frontend**: http://localhost:3000 (or custom port from `.env`)
- **Backend API**: http://localhost/api/hi/World (or custom port from `.env`)
- **API Documentation**: http://localhost/api/docs (or custom port from `.env`)
- **Database**: localhost:3306 (or custom port from `.env`) (user: `leasingmarkt`, password: `password`)

## 🛠️ Available Make Commands

```bash
# Setup commands
make network-create      # Create Docker network (one-time)
make setup-be           # Build and start backend containers
make setup-db           # Initialize database
make setup-fe           # Install frontend dependencies

# Run commands
make run-be             # Start backend (docker-compose up)
make run-fe             # Start frontend dev server

# Utility commands
make bash-db            # Open database CLI
make bash-be            # Open backend container shell
make stop-be            # Stop backend containers
make clean-be           # Remove backend containers and volumes
```

## 📊 Technology Stack

### Frontend

- **Framework**: Next.js 14 (React 18)
- **UI Library**: Material-UI (MUI) v5
- **Styling**: Emotion CSS-in-JS
- **State Management**: React hooks
- **Testing**: Jest + React Testing Library
- **Build Tool**: Turbopack (Next.js native)

### Backend

- **Framework**: Laravel 11
- **Language**: PHP 8.3
- **Web Server**: Apache 2.4
- **Database ORM**: Eloquent
- **API Documentation**: Swagger/OpenAPI (L5-Swagger)
- **Testing**: PHPUnit

### Database

- **DBMS**: MariaDB 10
- **Container**: Official MariaDB Docker image
- **Initialization**: Custom SQL scripts

### DevOps

- **Containerization**: Docker & Docker Compose
- **Networking**: External Docker network
- **Development**: Hot reload for both FE and BE

## 🗄️ Database Schema

### Current Tables

- `users` - User authentication
- `cache` - Application cache
- `jobs` - Queue jobs

### New Tables (Interview Task)

Use Laravel migrations:

@see https://laravel.com/docs/11.x/migrations

## 🧪 Testing

### Frontend Tests

```bash
cd fe
npm run test              # Run once
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

Test files in `fe/__tests__/`

### Backend Tests

```bash
cd be
php artisan test          # Run all tests
```

Test files in `be/tests/Feature/` and `be/tests/Unit/`

## 📝 API Documentation

The backend uses Swagger/OpenAPI for documentation.

Access at: http://localhost/api/docs

Example endpoint documentation:

@see `\App\Api\Application\Controller\HiController`

## 🐛 Troubleshooting

### Docker network issues

```bash
# Recreate network
docker network rm leasingmarkt-network
make network-create
```

### Database connection issues

```bash
# Check database is running
docker ps | grep leasingmarkt-db

# Check database logs
docker logs leasingmarkt-db

# Re-initialize database
make setup-db
```

### Frontend port already in use

```bash
# Option 1: Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Option 2: Use different port via .env file (recommended)
echo "FE_PORT=3001" >> .env
make run-fe

# Option 3: Use different port temporarily
cd fe && PORT=3001 npm run dev
```

### Backend 500 errors

```bash
# Check Laravel logs
docker exec -it leasingmarkt-be tail -f storage/logs/laravel.log

# Clear cache
docker exec -it leasingmarkt-be php artisan cache:clear
docker exec -it leasingmarkt-be php artisan config:clear
```

## 🔐 Environment Variables

### Root .env (Port Configuration)

The root `.env` file controls the ports used by all services. Copy `.env.example` to `.env` and customize as needed:

```env
# Backend Service (PHP/Laravel)
BACKEND_PORT=80

# Database Service (MariaDB)
DB_PORT=3306

# Frontend Service (Next.js)
FE_PORT=3000
```

**Default Ports:**

- Backend API: Port 80
- Database: Port 3306
- Frontend: Port 3000

**Customizing Ports:**

1. Copy `.env.example` to `.env`
2. Edit the port values
3. Restart services with `make down && make run`

**Port Conflict Resolution:**
If the default ports are already in use on your system, you can easily change them:

```bash
# Example: Change frontend to port 3001
echo "FE_PORT=3001" >> .env

# Example: Change backend to port 8080
echo "BACKEND_PORT=8080" >> .env

# Restart services
make down && make run
```

### Backend (.env)

Key variables in `be/.env`:

```env
APP_ENV=local
APP_DEBUG=true
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=leasingmarkt
DB_USERNAME=leasingmarkt
DB_PASSWORD=secret
```

### Frontend

Next.js configuration in `fe/next.config.js` for external image domains.

## 🏗️ Architecture Overview

This project replicates the **LeasingMarkt architecture** with clear separation between frontend and backend:

```
┌─────────────────────────────────────────────────────────────┐
│                         User Browser                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP Requests
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  Frontend (Next.js + React)                                  │
│  Port: 3000                                                  │
│  • Server-side rendering                                     │
│  • React components (Material-UI)                            │
│  • Client-side filtering & pagination                        │
│  • Currently uses local JSON data                            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ API Calls (HTTP/REST)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  Backend (PHP + Laravel)                                     │
│  Port: 80                                                    │
│  • RESTful API endpoints                                     │
│  • Business logic & data processing                          │
│  • Swagger/OpenAPI documentation                             │
│  • Authentication & authorization                            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ SQL Queries
                         ▼
┌─────────────────────────────────────────────────────────────┐
│  Database (MariaDB)                                          │
│  Port: 3306                                                  │
│  • Persistent data storage                                   │
│  • User accounts, car listings, etc.                         │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
lm-hiring-ai-node-js-php-listing/
├── fe/                          # Frontend Application (Next.js)
│   ├── app/                     # Next.js app directory
│   │   ├── api/                 # API routes (middleware layer)
│   │   ├── cars/                # Car listing pages
│   │   └── page.js              # Homepage
│   ├── components/              # React components
│   │   ├── CarCard.js           # Individual car display
│   │   ├── CarFilters.js        # Filter sidebar
│   │   ├── CarList.js           # Main listing component
│   │   └── ...
│   ├── data/                    # Mock data (JSON)
│   │   └── cars.json            # 40+ car records
│   ├── public/                  # Static assets
│   └── package.json             # Dependencies
│
├── be/                          # Backend Application (Laravel)
│   ├── app/                     # Application code
│   │   ├── Api/                 # API layer
│   │   │   └── Application/
│   │   │       └── Controller/  # API controllers
│   │   ├── Models/              # Eloquent models
│   │   └── Console/             # CLI commands
│   ├── routes/
│   │   └── api.php              # API route definitions
│   ├── database/
│   │   └── migrations/          # Database migrations
│   ├── config/                  # Configuration files
│   └── composer.json            # PHP dependencies
│
├── docker/                      # Docker configuration
│   ├── docker-compose.yml       # Service orchestration
│   ├── php-apache/              # PHP container setup
│   │   └── Dockerfile
│   └── db/                      # Database initialization
│       └── scripts/
│           └── setup-db.sh      # DB setup script
│
└── Makefile                     # Development commands
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Laravel Documentation](https://laravel.com/docs)
- [Material-UI Documentation](https://mui.com/)
- [Docker Documentation](https://docs.docker.com/)

## 🤝 Contributing

This project is used for hiring assessments. For questions or issues:

1. Review this README thoroughly
2. Check existing code and comments
3. Use API documentation at `/api/documentation`
4. Ask your interviewer for clarification

## 📄 License

Proprietary - LeasingMarkt GmbH

---

**Good luck with your assessment!** Remember, we value:

- Clear thinking over perfect code
- Communication over speed
- Learning ability over existing knowledge
- Effective AI usage as a productivity multiplier
