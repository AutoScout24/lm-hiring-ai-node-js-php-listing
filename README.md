# LeasingMarkt Hiring Assessment - Full Stack Listing Application

A modern, responsive car listing application that demonstrates a production-ready architecture with separated frontend and backend services, similar to the LeasingMarkt platform.


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

# One script setup
make setup

# One script to run
make run
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



## 📝 API Documentation

The backend uses Swagger/OpenAPI for documentation.

Access at: http://localhost/api/docs

Example endpoint documentation:

@see `\App\Api\Application\Controller\HiController`


**Default Ports:**
- Backend API: Port 80
- Database: Port 3306
- Frontend: Port 3000


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


## 📄 License

Proprietary - LeasingMarkt GmbH

---

**Good luck with your assessment!** Remember, we value:
- Clear thinking over perfect code
- Communication over speed
- Learning ability over existing knowledge
- Effective AI usage as a productivity multiplier
