# 🏏 Cricket Team Management System

A RESTful API built with **Java 21 + Spring Boot 3.2** for managing cricket team players.

---

## 🗂️ Project Structure

```
cricket-team-management/
├── pom.xml
└── src/
    ├── main/
    │   ├── java/com/cricket/team/
    │   │   ├── CricketTeamManagementApplication.java   ← Entry point
    │   │   ├── controller/
    │   │   │   └── PlayerController.java               ← REST endpoints
    │   │   ├── service/
    │   │   │   ├── PlayerService.java                  ← Interface
    │   │   │   └── PlayerServiceImpl.java              ← Business logic
    │   │   ├── repository/
    │   │   │   └── PlayerRepository.java               ← JPA / ORM
    │   │   ├── model/
    │   │   │   ├── Player.java                         ← JPA Entity
    │   │   │   └── PlayerRole.java                     ← Enum
    │   │   ├── dto/
    │   │   │   ├── PlayerRequestDTO.java               ← Input (validated)
    │   │   │   ├── PlayerResponseDTO.java              ← Output
    │   │   │   ├── ApiResponse.java                    ← Wrapper
    │   │   │   └── ErrorResponse.java                  ← Error format
    │   │   ├── exception/
    │   │   │   ├── PlayerNotFoundException.java
    │   │   │   ├── DuplicateJerseyNumberException.java
    │   │   │   └── GlobalExceptionHandler.java         ← @RestControllerAdvice
    │   │   └── config/
    │   │       ├── PlayerMapper.java                   ← MapStruct
    │   │       └── OpenApiConfig.java                  ← Swagger
    │   └── resources/
    │       ├── application.properties
    │       ├── db-setup.sql                            ← Full setup with seed data
    │       └── db/migration/
    │           └── V1__init_schema.sql                 ← Flyway migration
    └── test/
        └── java/com/cricket/team/
            └── PlayerServiceTest.java
```

---

## ⚙️ Technology Stack

| Layer        | Technology                        |
|--------------|-----------------------------------|
| Language     | Java 21                           |
| Framework    | Spring Boot 3.2.5                 |
| ORM          | Spring Data JPA (Hibernate)       |
| Database     | MySQL 8.0+                        |
| Validation   | Spring Boot Validation (JSR-380)  |
| Mapping      | MapStruct 1.5.5                   |
| API Docs     | SpringDoc OpenAPI (Swagger UI)    |
| Build        | Maven                             |
| Testing      | JUnit 5 + Mockito                 |

---

## 🗄️ Database Setup

### Step 1 — Run the SQL setup script

```bash
mysql -u root -p < src/main/resources/db-setup.sql
```

This creates:
- The `cricket_db` database
- User `cricket_user` with password `cricket_pass`
- The `players` table with all constraints
- 10 sample players

### Step 2 — Configure connection (optional)

Edit `src/main/resources/application.properties` or use environment variables:

```bash
export DB_URL=jdbc:mysql://localhost:3306/cricket_db?useSSL=false&serverTimezone=UTC
export DB_USERNAME=cricket_user
export DB_PASSWORD=cricket_pass
export SERVER_PORT=8080
```

---

## 🚀 Running the Application

```bash
# Build
mvn clean install

# Run
mvn spring-boot:run

# Or with JAR
java -jar target/cricket-team-management-1.0.0.jar
```

App starts at: **http://localhost:8080**  
Swagger UI: **http://localhost:8080/swagger-ui.html**

---

## 📡 API Endpoints

### Base URL: `http://localhost:8080/api/players`

| Method   | Endpoint                    | Description            |
|----------|-----------------------------|------------------------|
| `GET`    | `/api/players`              | Get all players        |
| `GET`    | `/api/players/{playerId}`   | Get player by ID       |
| `POST`   | `/api/players`              | Create a new player    |
| `PUT`    | `/api/players/{playerId}`   | Update player details  |
| `DELETE` | `/api/players/{playerId}`   | Delete a player        |

---

## 📥 Player Fields

| Field           | Type    | Required | Rules                                          |
|-----------------|---------|----------|------------------------------------------------|
| playerName      | String  | ✅       | 2–100 chars, letters/spaces/dots/hyphens only  |
| jerseyNumber    | Integer | ✅       | 1–999, **must be unique**                      |
| role            | String  | ✅       | Batsman / Bowler / Keeper / All Rounder        |
| totalMatches    | Integer | ✅       | 0–10000                                        |
| teamName        | String  | ✅       | 2–100 chars                                    |
| countryOrState  | String  | ✅       | 2–100 chars                                    |
| description     | String  | ❌       | Max 1000 chars                                 |

---

## 📋 Request / Response Examples

### POST /api/players — Create Player

**Request:**
```json
{
  "playerName": "Sachin Tendulkar",
  "jerseyNumber": 10,
  "role": "Batsman",
  "totalMatches": 664,
  "teamName": "India National Team",
  "countryOrState": "India",
  "description": "Master Blaster. The greatest batsman of all time."
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Player created successfully",
  "data": {
    "playerId": 11,
    "playerName": "Sachin Tendulkar",
    "jerseyNumber": 10,
    "role": "Batsman",
    "totalMatches": 664,
    "teamName": "India National Team",
    "countryOrState": "India",
    "description": "Master Blaster. The greatest batsman of all time.",
    "createdAt": "2024-06-24 10:30:00",
    "updatedAt": null
  },
  "timestamp": "2024-06-24 10:30:00"
}
```

### Validation Error (400 Bad Request)
```json
{
  "success": false,
  "status": 400,
  "error": "Validation Failed",
  "message": "Request validation failed. Please check the fields below.",
  "path": "/api/players",
  "timestamp": "2024-06-24 10:30:00",
  "validationErrors": {
    "playerName": "Player name is required",
    "jerseyNumber": "Jersey number must be at least 1"
  }
}
```

### Not Found Error (404)
```json
{
  "success": false,
  "status": 404,
  "error": "Not Found",
  "message": "Player not found with ID: 99",
  "path": "/api/players/99",
  "timestamp": "2024-06-24 10:30:00"
}
```

---

## 🧪 Running Tests

```bash
mvn test
```
