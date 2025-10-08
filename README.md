# Northgate School - Next.js 15 School Website

A modern, production-ready school website built with Next.js 15, TypeScript, and TailwindCSS.

## 🚀 Features

- **Next.js 15** with App Router and Server Components
- **TypeScript** for type safety
- **TailwindCSS** for styling
- **Responsive Design** optimized for all devices
- **Production-ready** Docker configuration
- **Database Integration** (MySQL support)
- **Modern UI Components** with Radix UI and Lucide icons

## 🛠️ Tech Stack

- **Framework:** Next.js 15.5.4
- **Language:** TypeScript
- **Styling:** TailwindCSS 4.0
- **Database:** MySQL (external)
- **Deployment:** Docker & Docker Compose
- **Testing:** Jest, Cypress
- **Linting:** ESLint
- **Code Quality:** Prettier, Husky

## 🚀 Quick Start

### Option 1: Docker (Recommended for Production)

#### Prerequisites

- Docker
- Docker Compose

#### Local Development with Docker

```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your configuration (database credentials are pre-filled)
nano .env

# Start the complete stack (Next.js + MySQL + Nginx)
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

**Services available:**

- **Next.js App:** [http://localhost:3000](http://localhost:3000)
- **Nginx Proxy:** [http://localhost](http://localhost)
- **MySQL Database:** localhost:3306 (from host machine)

#### Production Deployment

```bash
# Build and run production container
docker build -t northgate-school .
docker run -d -p 3000:3000 --name northgate-school northgate-school
```

#### Production Deployment with Nginx Reverse Proxy

```bash
# Build the application
docker build -t northgate-school .

# Run the full stack (app + nginx)
docker-compose -f docker-compose.yml up -d --build

# Or run just the nginx proxy (if app is already running)
docker-compose up -d nginx
```

The application will be available at:

- **HTTP:** [http://localhost](http://localhost) (via nginx)
- **HTTPS:** [https://localhost](https://localhost) (when SSL is configured)
- **Direct:** [http://localhost:3000](http://localhost:3000) (Next.js app directly)
- **MySQL:** localhost:3306 (accessible from host machine)

### Option 2: Local Development (Traditional)

#### Prerequisites

- Node.js 18+
- npm/yarn/pnpm

```bash
# Install dependencies (including Prisma)
npm install

# Copy environment template
cp .env.example .env

# Edit .env file with your configuration
nano .env

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📦 Docker Configuration

### Production Dockerfile Features

- **Multi-stage build** for optimal image size
- **Security hardened** with non-root user
- **Health checks** for container monitoring
- **Production dependencies only**
- **Optimized for performance**

### Development Docker Compose

- **Hot reload** for development
- **Volume mounting** for live code changes
- **Named volumes** for Next.js cache
- **Proper networking** setup

### MySQL Database Service

- **MySQL 8.0** with UTF8MB4 character set
- **Persistent data** with named volumes
- **Health checks** for service readiness
- **Database initialization** support
- **Accessible from host** on port 3306

### Nginx Reverse Proxy Features

- **Load balancing** and health checks
- **SSL/TLS termination** (HTTPS support)
- **Security headers** for protection
- **Gzip compression** for performance
- **Rate limiting** to prevent abuse
- **Static asset caching** for better performance

### SSL Configuration (Optional)

To enable HTTPS in production:

1. Place your SSL certificates in the `ssl/` directory:

   ```
   ssl/
   ├── cert.pem    # Your SSL certificate
   ├── key.pem     # Private key
   └── chain.pem   # Certificate chain (optional)
   ```

2. Uncomment the HTTPS server block in `nginx.conf`

3. Update the domain name in the nginx configuration

### Useful Docker Commands

```bash
# View logs for all services
docker-compose logs -f

# View logs for specific service
docker-compose logs -f nginx
docker-compose logs -f bluecrest-academy

# Stop all services
docker-compose down

# Clean up containers and volumes
docker-compose down -v

# Build without cache
docker-compose build --no-cache

# Execute commands in containers
docker-compose exec bluecrest-academy sh
docker-compose exec nginx sh

# Scale services (if needed)
docker-compose up -d --scale bluecrest-academy=2
```

## 🗄️ Database Setup (Prisma ORM)

This project uses **Prisma ORM** with **MySQL** database.

### Prisma Setup

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database (for development)
npm run db:push

# Open Prisma Studio (database GUI)
npm run db:studio

# Create and apply migrations (for production)
npm run db:migrate
```

### Database Schema

The Prisma schema (`prisma/schema.prisma`) includes:

- **User Management**: Users with roles (ADMIN, TEACHER, STUDENT)
- **Student Profiles**: Extended student information
- **Teacher Profiles**: Teacher specializations and experience
- **Course Management**: Course catalog with teacher assignments
- **Enrollment System**: Student-course relationships with grades
- **Event Management**: School events and attendance
- **Application System**: Admission applications
- **Content Management**: Announcements and feedback

### Database Connection

The application uses the following connection setup:

```typescript
// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  log: ["query"], // Enable query logging in development
});
```

### Environment Variables

Configure your database connection in `.env`:

```bash
# Database Configuration
DATABASE_URL="mysql://username:password@localhost:3306/northgate_school"
PRISMA_DATABASE_URL="${DATABASE_URL}"
```

Copy `.env.example` to `.env` and configure:

### Database Configuration (Docker)

When using Docker, the database is automatically configured:

```bash
# Database (Docker MySQL)
DB_HOST=mysql
DB_PORT=3306
DB_NAME=northgate_school
DB_USER=northgate_user
DB_PASSWORD=northgate_password
DB_ROOT_PASSWORD=northgate_root_password

# Or use DATABASE_URL
DATABASE_URL="mysql://northgate_user:northgate_password@mysql:3306/northgate_school"
```

### Database Configuration (External MySQL)

For external MySQL databases:

```bash
# Database (External MySQL)
DB_HOST=your-db-host.com
DB_PORT=3306
DB_NAME=northgate_school
DB_USER=your_username
DB_PASSWORD=your_password

# DATABASE_URL="mysql://username:password@host:3306/database"
```

### Database Initialization

The MySQL container includes directories for custom initialization:

- **`mysql/init/`** - SQL scripts to run on first startup
- **`mysql/conf.d/`** - Custom MySQL configuration files

Example database initialization script (`mysql/init/01-create-tables.sql`):

```sql
-- Create your tables here
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run E2E tests
npm run cypress:run

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

### Production Checklist

- [ ] Update environment variables in `.env`
- [ ] Set `NODE_ENV=production`
- [ ] Configure external database connection (if not using Docker MySQL)
- [ ] Set up SSL certificates (if needed)
- [ ] Configure reverse proxy (nginx recommended)
- [ ] Set up monitoring and logging
- [ ] Configure database backups (for production data)

### Docker Production Deployment

```bash
# Build production image
docker build -t northgate-school:prod .

# Run with production settings
docker run -d \
  --name northgate-school-prod \
  -p 3000:3000 \
  -e NODE_ENV=production \
  --restart unless-stopped \
  northgate-school:prod
```

### Production Deployment with MySQL & Nginx

For complete production deployment:

1. **Database Setup:**
   - MySQL container persists data in `mysql_data` volume
   - Database is accessible on port 3306 from host machine
   - Use `mysql/init/` scripts for schema setup

2. **SSL Configuration** (see SSL Configuration section above)

3. **Deploy Full Stack:**

```bash
# Deploy all services
docker-compose -f docker-compose.yml up -d --build

# Or build specific images first
docker-compose build mysql northgate-school nginx
docker-compose up -d mysql northgate-school nginx
```

### Database Management

```bash
# Access MySQL container
docker-compose exec mysql mysql -u root -p

# Backup database
docker-compose exec mysql mysqldump -u root -p northgate_school > backup.sql

# Restore database
docker-compose exec -T mysql mysql -u root -p northgate_school < backup.sql

# View MySQL logs
docker-compose logs mysql
```

### Production Deployment with Nginx

For production deployment with nginx reverse proxy:

1. **Set up SSL certificates** in the `ssl/` directory
2. **Update nginx configuration** with your domain name
3. **Uncomment HTTPS server block** in `nginx.conf`
4. **Deploy using Docker Compose:**

```bash
# Deploy full stack
docker-compose -f docker-compose.yml up -d --build

# Or build specific images first
docker-compose build
docker-compose up -d
```

### Scaling and Load Balancing

The nginx configuration supports load balancing. To scale your application:

```bash
# Scale the Next.js application
docker-compose up -d --scale bluecrest-academy=3

# Update nginx upstream configuration if needed
# The current config already supports multiple backend servers
```

## 📁 Project Structure

```
├── .dockerignore          # Docker ignore patterns
├── Dockerfile             # Production Docker configuration
├── docker-compose.yml     # Development Docker setup
├── nginx.conf            # Nginx reverse proxy configuration
├── ssl/                  # SSL certificates directory
│   └── README.md         # SSL setup instructions
├── mysql/                # MySQL database files
│   ├── init/             # Database initialization scripts
│   └── conf.d/           # MySQL configuration files
├── prisma/               # Prisma ORM configuration
│   └── schema.prisma     # Database schema and models
├── src/                  # Application source code
│   ├── lib/              # Utility functions and database client
│   │   └── prisma.ts     # Prisma client setup
│   ├── app/              # Next.js app router pages
│   ├── components/       # Reusable UI components
│   └── lib/              # Utility functions
├── public/               # Static assets
└── cypress/              # E2E tests
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run the test suite
6. Submit a pull request

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run Jest tests
- `npm run cypress:run` - Run Cypress E2E tests

### Database Scripts (Prisma)

- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Seed database with initial data
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:migrate` - Create and apply database migrations
- `npm run db:reset` - Reset database (development only)

## 📄 License

This project is private and proprietary.

## 🆘 Support

For support and questions, please contact the development team.
