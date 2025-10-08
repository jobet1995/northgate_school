# MySQL Database Configuration

This directory contains MySQL database configuration files for the Northgate School Docker setup.

## Directory Structure

```
mysql/
├── init/                 # Database initialization scripts
│   └── 01-northgate-school-schema.sql
└── conf.d/               # MySQL configuration files
    └── northgate.cnf
```

## Database Initialization (init/)

The `init/` directory contains SQL scripts that run automatically when the MySQL container starts for the first time. These scripts:

- Create the `northgate_school` database
- Set up tables (users, courses, enrollments, announcements)
- Insert sample data for development
- Display creation results

### Adding Custom Initialization Scripts

1. Create new `.sql` files in the `init/` directory
2. Name them with a numeric prefix (e.g., `02-custom-tables.sql`)
3. Scripts run in alphabetical order
4. They execute only on the first container startup

Example custom script:

```sql
-- 02-custom-tables.sql
USE northgate_school;

CREATE TABLE custom_table (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## MySQL Configuration (conf.d/)

The `conf.d/` directory contains MySQL configuration files that are loaded when the MySQL server starts.

### Current Configuration (northgate.cnf)

The included configuration provides:

- **Performance tuning** for development workloads
- **UTF8MB4 character set** support for international characters
- **Query caching** enabled
- **Security settings** (skip name resolution, bind to all interfaces)
- **Logging** (slow query log enabled)

### Custom Configuration

You can add additional `.cnf` files to customize MySQL behavior:

```ini
# custom-performance.cnf
[mysqld]
innodb_buffer_pool_size=256M
max_connections=200
```

## Usage with Docker

The MySQL service in `docker-compose.yml` automatically:

- Mounts these directories as volumes
- Runs initialization scripts on first startup
- Applies configuration files

## Database Connection

From your Next.js application:

```javascript
// Using individual environment variables
const mysql = require("mysql2/promise");
const connection = await mysql.createConnection({
  host: process.env.DB_HOST || "mysql",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "northgate_user",
  password: process.env.DB_PASSWORD || "northgate_password",
  database: process.env.DB_NAME || "northgate_school",
});

// Or using DATABASE_URL
const connection = await mysql.createConnection(process.env.DATABASE_URL);
```

## Database Management

```bash
# Access MySQL container directly
docker-compose exec mysql mysql -u root -p

# Backup database
docker-compose exec mysql mysqldump -u root -p northgate_school > backup-$(date +%Y%m%d).sql

# Restore database
docker-compose exec -T mysql mysql -u root -p northgate_school < backup.sql

# View MySQL logs
docker-compose logs mysql

# Restart MySQL service
docker-compose restart mysql
```

## Production Considerations

For production deployments:

1. **Change default passwords** in `.env` file
2. **Enable SSL** for database connections
3. **Set up automated backups**
4. **Monitor database performance**
5. **Configure proper resource limits** in docker-compose.yml

## Troubleshooting

**Container won't start:**

- Check MySQL logs: `docker-compose logs mysql`
- Verify environment variables in `.env` file
- Ensure port 3306 is not already in use

**Connection issues:**

- Confirm DB_HOST is set to `mysql` (Docker) or your MySQL server address
- Check database credentials match your `.env` configuration
- Verify the database and user exist

**Performance issues:**

- Review slow query log: `docker-compose exec mysql cat /var/lib/mysql/mysql-slow.log`
- Adjust buffer pool size in `conf.d/bluecrest.cnf`
- Consider adding indexes to frequently queried columns
