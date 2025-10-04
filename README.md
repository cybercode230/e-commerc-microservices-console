Perfect! Thanks for sharing the code and setup. I can now create a **complete README** for both the “without Consul” version (simpler static URLs) and the “with Consul” version (dynamic service discovery), plus a comparison between them. Here’s a professional draft:

---

# E-Commerce Microservices Project

## Overview

This project is a **Node.js-based microservices e-commerce platform** that includes:

* **API Gateway**: Routes requests to services.
* **Auth Service**: Handles authentication (login, health check).
* **User Service**: Manages user data and mock e-commerce users.
* **Consul** (optional): Service discovery and registration for dynamic routing.

The project includes **two versions**:

1. **Without Consul** – Static service URLs in API Gateway.
2. **With Consul** – Services dynamically discovered via Consul.

---

## Architecture

```
        +----------------+
        |   API Gateway  |
        |----------------|
        | /auth/*        | --> Auth Service
        | /user/*        | --> User Service
        +----------------+
              |
        (Optional Consul)
```

* **API Gateway** handles all external requests.
* **Auth Service** listens on port `5000`.
* **User Service** listens on port `5001`.
* **Gateway** listens on port `5002`.

---

## Prerequisites

* Node.js v22+
* npm
* (Optional) Consul installed for dynamic service discovery

### Install dependencies

```bash
cd api-gateway
npm install

cd ../auth-service
npm install

cd ../user-service
npm install
```

---

## Environment Variables

Create `.env` files in each service:

**API Gateway (`.env`)**

```
PORT=5002
```

**Auth Service (`.env`)**

```
PORT=5000
```

**User Service (`.env`)**

```
PORT=5001
```

---

## Running the Services

### Without Consul

Each service uses static URLs.

```bash
# API Gateway
npm run start:api

# Auth Service
cd ../auth-service && npm run dev

# User Service
cd ../user-service && npm run dev
```

### With Consul (Recommended)

Start Consul and all services concurrently:

```bash
cd api-gateway
npm run start:all
```

* This runs:

  * Consul agent
  * API Gateway
  * Auth Service
  * User Service

---

## API Endpoints

### API Gateway

**Health check**

```
GET /health
```

**Auth routes**

```
POST /auth/login
GET /auth/health
```

**User routes**

```
GET /users
GET /user/:id
POST /user/me
GET /user/health
```

### Auth Service

```
POST /auth/login
GET /auth/health
```

### User Service

```
GET /users
GET /user/:id
POST /user/me
GET /user/health
```

---

## Consul Service Registration (Dynamic Version)

* Each service registers itself with Consul on startup.
* Gateway queries Consul for service addresses dynamically.
* Health checks performed every `10s`.

---

## Mock Data

**User Service** includes sample users:

```json
[
  { "id": 1, "name": "Alice Johnson", "email": "alice@example.com" },
  { "id": 2, "name": "Bob Smith", "email": "bob@example.com" }
]
```

**Auth Service** returns a mock token for login.

---

## Comparing Both Versions

| Feature                 | Without Consul | With Consul                             |
| ----------------------- | -------------- | --------------------------------------- |
| Service discovery       | Static URLs    | Dynamic via Consul                      |
| Scalability             | Low            | High (new instances auto-discovered)    |
| Failover                | No             | Yes, API Gateway can pick healthy nodes |
| Setup complexity        | Simple         | Moderate (requires Consul)              |
| Realistic microservices | Partial        | Full microservices simulation           |

**Recommendation**: Use **Consul version** for realistic enterprise setups.

---

## Troubleshooting

1. **Consul not found**
   Install Consul from [https://developer.hashicorp.com/consul/downloads](https://developer.hashicorp.com/consul/downloads)

2. **ECONNREFUSED errors**
   Ensure Consul agent is running before starting services.

3. **Node warnings about module type**
   Add `"type": "module"` to `package.json` for ES module syntax.

---

## License

MIT License

---

I can also **create a fully formatted `README.md` file** ready to drop into your repository with **proper badges, code highlighting, and instructions** if you want.

Do you want me to do that next?
