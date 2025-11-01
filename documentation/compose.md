# Docker Compose Documentation

## Overview

Docker Compose is a tool for defining and running multi-container Docker applications. It uses YAML files to configure the application's services, networks, and volumes, allowing you to manage complex applications with a single command.

### Role and Purpose

Docker Compose serves as an orchestration tool that:
- **Manages multi-container applications** in a single YAML file
- **Orchestrates services** by defining their relationships and dependencies
- **Simplifies deployment** by replacing complex docker run commands
- **Provides service discovery** through internal networking

## Key Concepts

### 1. Services
A service is a container definition that represents a single component of your application (e.g., database, API, web server).

### 2. Networks
Services can communicate with each other through defined networks, enabling service discovery by container name.

### 3. Volumes
Persistent data storage that survives container restarts and can be shared between containers.

### 4. Dependencies
Services can depend on other services, ensuring proper startup order.

## YAML File Composition

A typical `docker-compose.yml` file structure:

```yaml
name: 'project-name'

services:
  service-name:
    image: image-name
    build: ./path/to/dockerfile
    container_name: custom-name
    ports:
      - "host-port:container-port"
    environment:
      - KEY=value
    volumes:
      - host-path:container-path
    networks:
      - network-name
    depends_on:
      - other-service

networks:
  network-name:
    driver: bridge

volumes:
  volume-name:
```

### Example Compose File

Based on our project structure with `db` (PostgreSQL) and `api` (custom app) services:

```yaml
name: insta-training

networks:
  insta-training-network:
    driver: bridge

services:
  db:
    image: postgres
    container_name: insta-training-db
    environment:
      - POSTGRES_PASSWORD=insta-training
    ports:
      - 4200:5432
    volumes:
      - insta-training-volume:/var/lib/postgresql/data
    networks:
      - insta-training-network
    restart: always

  api:
    container_name: insta-training-api-container
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 3001:3001
    environment:
      - NODE_ENV=production
      - PORT=3001
      - DATABASE_URL=postgresql://postgres:insta-training@insta-training-db:5432/custom-db-name?schema=public
    networks:
      - insta-training-network
    depends_on:
      - db
    restart: always

volumes:
  insta-training-volume:
```

## Docker Compose Commands

### 1. Build Services

**Docker Compose:**
```bash
docker compose build
```

**Docker CLI Equivalent:**
```bash
# For the API service (custom image)
docker build -t insta-training-api-container -f Dockerfile .

# For the DB service (using existing image)
docker pull postgres
```

### 2. Start Services (Up)

**Docker Compose:**
```bash
# Start all services
docker compose up

# Start in detached mode (background)
docker compose up -d

# Rebuild images before starting
docker compose up --build

# Start without dependencies
docker compose up --no-deps

# Start specific service
docker compose up db
```

**Docker CLI Equivalent:**
```bash
# Create network
docker network create insta-training-network

# Create volume
docker volume create insta-training-volume

# Start database
docker run -d \
  --name insta-training-db \
  --network insta-training-network \
  -e POSTGRES_PASSWORD=insta-training \
  -p 4200:5432 \
  -v insta-training-volume:/var/lib/postgresql/data \
  --restart always \
  postgres

# Build and start API
docker build -t api-image -f Dockerfile .
docker run -d \
  --name insta-training-api-container \
  --network insta-training-network \
  -e NODE_ENV=production \
  -e PORT=3001 \
  -e DATABASE_URL=postgresql://postgres:insta-training@insta-training-db:5432/custom-db-name?schema=public \
  -p 3001:3001 \
  --restart always \
  api-image
```

### 3. Stop Services (Down)

**Docker Compose:**
```bash
# Stop and remove containers, networks
docker compose down

# Stop and remove containers, networks, and volumes
docker compose down -v

# Stop and remove containers, networks, volumes, and images
docker compose down --rmi all
```

**Docker CLI Equivalent:**
```bash
# Stop containers
docker stop insta-training-api-container insta-training-db

# Remove containers
docker rm insta-training-api-container insta-training-db

# Remove network
docker network rm insta-training-network

# Remove volume (if using -v flag)
docker volume rm insta-training-volume
```

### 4. Start Existing Services

**Docker Compose:**
```bash
# Start all stopped services
docker compose start

# Start specific service
docker compose start db
```

**Docker CLI Equivalent:**
```bash
# Start specific containers
docker start insta-training-db insta-training-api-container
```

### 5. Stop Running Services

**Docker Compose:**
```bash
# Stop all running services
docker compose stop

# Stop specific service
docker compose stop api
```

**Docker CLI Equivalent:**
```bash
# Stop specific containers
docker stop insta-training-api-container insta-training-db
```

### 6. List Services (PS)

**Docker Compose:**
```bash
# List running services
docker compose ps

# List all services (including stopped)
docker compose ps -a
```

**Docker CLI Equivalent:**
```bash
# List containers
docker ps

# List all containers
docker ps -a

# Filter by project name
docker ps --filter "name=insta-training"
```

### 7. View Logs

**Docker Compose:**
```bash
# View logs from all services
docker compose logs

# Follow logs in real-time
docker compose logs -f

# View logs from specific service
docker compose logs db

# View logs with timestamps
docker compose logs -t
```

**Docker CLI Equivalent:**
```bash
# View logs from specific container
docker logs insta-training-db

# Follow logs
docker logs -f insta-training-db

# View logs with timestamps
docker logs -t insta-training-db
```

### 8. Execute Commands in Running Containers

**Docker Compose:**
```bash
# Execute interactive shell
docker compose exec api bash
```

**Docker CLI Equivalent:**
```bash
# Execute interactive shell
docker exec -it insta-training-api bash
```

## Container Scaling

### Scaling Commands

**Docker Compose:**
```bash
# Scale specific service
docker compose up --scale api=3

# Scale multiple services
docker compose up --scale api=3 --scale db=2
```

**Docker CLI Equivalent:**
```bash
# Create multiple containers manually
docker run -d --name api-1 --network insta-training-network -p 3002:3001 api-image
docker run -d --name api-2 --network insta-training-network -p 3003:3001 api-image
docker run -d --name api-3 --network insta-training-network -p 3004:3001 api-image
```

### YAML Properties for Scaling

When scaling containers, consider these YAML properties:

```yaml
services:
  api:
    # Don't specify container_name when scaling
    # container_name: insta-training-api-container  # Remove this line
    
    # Don't specify host ports when scaling
    # ports:
    #   - "3001:3001"  # Remove this line
    
    # Use internal port only
    expose:
      - "3001"
    
    # Or use port range for scaling
    ports:
      - "3001-3005:3001"  # Allows 5 instances
```

### Important Scaling Considerations

1. **Container Names**: When scaling, don't specify `container_name` in the YAML as Docker Compose will automatically generate unique names (e.g., `insta-training_api_1`, `insta-training_api_2`).

2. **Port Management**: 
   - Don't specify host ports when scaling as they will conflict
   - Use `expose` instead of `ports` for internal communication
   - Or use port ranges: `"3001-3005:3001"`

### Example Scaled Configuration

```yaml
services:
  api:
    build:
      context: .
      dockerfile: Dockerfile
    expose:
      - "3001"
    environment:
      - NODE_ENV=production
      - PORT=3001
    networks:
      - insta-training-network
    depends_on:
      - db
    restart: always

  nginx:
    image: nginx
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    networks:
      - insta-training-network
    depends_on:
      - api
```

## References

- [Compose file reference](https://docs.docker.com/reference/compose-file/) - Official Docker Compose file format specification
- [Docker Compose manual](https://docs.docker.com/compose/)