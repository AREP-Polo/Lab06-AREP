# Properties Management System

A CRUD application for managing properties, featuring a Spring Boot REST API backend and an HTML/JavaScript frontend, with MySQL database integration.

## Features

- Create, read, update, and delete properties
- Property attributes: ID, address, price, size, description
- RESTful API endpoints
- Client-side validation
- Error handling for invalid inputs and non-existent resources
- Docker containerization for easy deployment
- Production configuration support

## Technologies

- Backend: Spring Boot, JPA/Hibernate
- Database: MySQL
- Frontend: HTML, JavaScript (AJAX/Fetch API)
- Containerization: Docker, Docker Compose

## Setup and Installation

### Prerequisites

- Docker and Docker Compose installed
- Java 17+ (for local development)
- Maven (for local development)

### Running with Docker

1. Clone the repository.
2. Navigate to the project directory.
3. Run `docker-compose up --build` to start the application and MySQL database.

The application will be available at `http://localhost:8080`.

### Local Development

1. Ensure MySQL is running locally or update `application.properties` for your database.
2. Run `mvn spring-boot:run` to start the application.
3. Access the frontend at `http://localhost:8080`.

## Usage

- Open the application in a web browser.
- Use the interface to create, view, update, and delete properties.
- API endpoints are available under `/api/properties`.

## Project Structure

- `src/main/java/com/properties/`: Java source code (entities, controllers, repositories, config)
- `src/main/resources/static/`: Frontend files (HTML, CSS, JS)
- `src/main/resources/`: Application properties and data scripts
- `Dockerfile`: Docker configuration for the application
- `docker-compose.yml`: Orchestrates app and MySQL services
- `pom.xml`: Maven dependencies

## Configuration

- `application.properties`: Default development settings
- `application-prod.properties`: Production environment settings

## Author

Marianella Polo Peña  
Escuela Colombiana de Ingeniería