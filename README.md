# Karmah Server

The robust backend service for the **Karmah** Task Management Platform.

Built with a clean architecture focusing on security, scalability, and developer experience. Karmah Server implements modern software engineering principles including MVC patterns, Role-Based Access Controls (RBAC), and centralized error handling.

## 🚀 Features

- **RBAC Authentication**: Secure access control with `OWNER`, `MEMBER`, and `VIEWER` roles.
- **JWT Security**: Isolated bearer pipelines for all sensitive task operations.
- **Auto-Demo Provisioning**: Secured API-key driven demo account creation.
- **OpenAPI Documentation**: Fully interactive Swagger UI for API exploration.
- **Global Error Handling**: Standardized response payloads for all exception cases.

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/)
- **Documentation**: [Swagger UI Express](https://github.com/scottie1984/swagger-ui-express)
- **Security**: [Bcryptjs](https://github.com/dcodeIO/bcrypt.js) & [JSON Web Token](https://github.com/auth0/node-jsonwebtoken)

## 🏁 Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)
- [pnpm](https://pnpm.io/)

### Installation

1. Navigate to the server directory:
   ```bash
   cd karmah-server
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start the development server:
   ```bash
   pnpm run dev
   ```

## 📖 API Documentation

Explore the API documentation and test endpoints directly via the interactive Swagger UI:

**`http://localhost:6000/api-docs`**

## 🔐 Environment Variables

| Variable | Description |
| :--- | :--- |
| `PORT` | Listening port for the Express server |
| `MONGO_URI` | Connection string for MongoDB |
| `JWT_SECRET` | Secret key for signing authorization tokens |
| `JWT_EXPIRES_IN` | Token validity duration |
| `DEMO_API_KEY` | Master key to authorize demo login requests |
| `DEMO_USER_EMAIL` | Default email for the system-generated demo account |

## 📁 Architecture

- `src/controllers/`: Business logic for authentication and task management.
- `src/middleware/`: Auth protection, RBAC validation, and global error handling.
- `src/models/`: Mongoose schemas for Users and Tasks.
- `src/routes/`: Express route definitions mapped to controllers.
- `src/docs/`: OpenAPI/Swagger documentation schema.

## 📄 License

Distributed under the MIT License.
