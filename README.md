# LeasingMarkt Hiring Assessment - Full Stack Listing Application

A modern, responsive car listing application that demonstrates a production-ready architecture with separated frontend and backend services, similar to the LeasingMarkt platform.

## 🎯 Purpose

This project is designed as an **interview assessment task** to evaluate candidates on:
- **Problem-solving skills**: Understanding and navigating an existing codebase
- **AI-assisted development**: Using AI tools to comprehend project structure and implement features
- **Full-stack coding abilities**: Working with both Next.js (React) and PHP (Laravel)
- **API integration**: Connecting frontend applications with backend services
- **Best practices**: Following modern web development patterns

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

### Current State vs Target State

**Current State:**
- ✅ Frontend is fully functional with local JSON data
- ✅ Backend has basic Laravel setup with sample endpoint
- ✅ Database is configured but minimal schema
- ❌ Frontend does NOT communicate with backend yet

**Target State (Interview Task):**
- Frontend should fetch data from backend API
- Backend should serve car listings from database
- Full CRUD operations for car listings
- Authentication and authorization

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
cp .env.example .env
# Edit .env to customize ports if needed (default: BE=80, DB=3306, FE=3000)

# One script setup
make setup
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

## 🎓 Interview Task Context

### What Candidates Will Do

Candidates will be asked to:

1. **Understand the Architecture**: Navigate and comprehend the existing codebase
2. **Create API Endpoints**: Build backend endpoints for car listings
3. **Integrate Frontend with Backend**: Replace JSON data with API calls
4. **Implement Features**: Add new functionality (filtering, sorting, pagination via API)
5. **Debug and Test**: Identify and fix issues, write tests
6. **Use AI Effectively**: Leverage AI tools to accelerate development

### Assessment Criteria

We evaluate candidates on:

- **Code Quality**: Clean, maintainable, well-structured code
- **Problem-Solving**: Approach to understanding and solving challenges
- **AI Tool Usage**: Effective use of AI assistants to boost productivity
- **Communication**: Ability to explain decisions and trade-offs
- **Best Practices**: Following REST conventions, security, testing

### Typical Tasks

Example tasks candidates might receive:

1. "Create a basic CRUD for cars following REST API standards and Laravel migrations"
2. "Create a backend API endpoint that returns all cars from the database"
3. "Modify the frontend to fetch car data from the backend API instead of JSON"
4. "Add filtering by price range on both frontend and backend"
5. "Implement pagination that works with the backend API"
6. "Add authentication to protect certain API endpoints"
7. "Create a basic CRUD for users following REST API standards and Laravel migrations"
8. "Add registration and authentication support in the FE application"

## 🔌 API Integration Guide

### Current State: Frontend Using JSON

The frontend currently loads data from `fe/data/cars.json`:

```javascript
// fe/app/api/cars/route.js
import carsData from "@/data/cars.json";

export async function GET(request) {
  // Process filters, return JSON data
  return NextResponse.json({ cars: filteredCars });
}
```

### Target State: Frontend Calling Backend API

**Step 1: Create Backend Controller**

```php
// be/app/Api/Application/Controller/CarController.php
#[OA\get(
    path: '/cars',
    description: 'Get cars by filters',
    tags: ['cars'],
)]
#[OA\QueryParameter(
    name: 'minPrice',
    required: true,
    schema: new OA\Schema(type: 'number'),
)]
#[OA\QueryParameter(
    name: 'maxPrice',
    required: true,
    schema: new OA\Schema(type: 'number'),
)]
#[OA\Response(
    response: '200',
    content: new OA\JsonContent(
        ref: CarsResponse::class,
    ),
)]
reaonly class GetCarController
{
    public function __invoke(CarRequest $carRequest): CarResponse
    {
        $cars = $this->carRepository->filterByPrice($carRequest->minPrice, $carRequest->maxPrice);

        return new CarResponse($cars);
    }
}
```

**Step 2: Register Backend Route**

```php
// be/routes/api.php
Route::get('/cars', CarController::class);
```

**Step 3: Update Frontend API Route**

```javascript
// fe/app/api/cars/route.js
export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const queryString = new URLSearchParams(searchParams).toString();

  const response = await fetch(`http://localhost/api/cars?${queryString}`);
  const data = await response.json();

  return NextResponse.json(data);
}
```

### CORS Configuration

If needed, add CORS middleware to Laravel:

```php
// be/config/cors.php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:3000'],
```

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
