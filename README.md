# Karmah Server

The backend service for the **Karmah** Task Management Platform. 

Built cleanly with a robust architecture using standard software engineering principles like MVC design pattern mappings, Role-Based Access Controls (RBAC), Global Error Middleware, AsyncHandlers, and MongoDB Mongoose ORM.

## Setup Instructions

1. Clone the project.
2. Ensure you have Node.js and a package manager installed.
3. Install dependencies by running:
```bash
pnpm install
```

4. Map out your `.env` variables (e.g. `MONGO_URI`, `JWT_SECRET`, and `JWT_EXPIRES_IN`).
5. Launch the development server:
```bash
pnpm run dev
```

## Documentation
An interactive GUI for the API endpoints is fully implemented using OpenAPI specifications with Swagger UI. You can explore the data shapes, token restrictions, and route params by visiting:
**`http://localhost:6000/api-docs`**

## Architecture Recap
- **Role-Based Enums**: Granular `OWNER`, `MEMBER`, and `VIEWER` constraints configured through a centralized `src/constants/roles.js` structure.
- **Enterprise Error Catching**: Route exceptions automatically drop into `src/middleware/error.middleware.js` providing guaranteed formatted structural payloads (`{ success: false, message: string }`).
- **Security Checkpoints**: Bcrypt password salt-hashing, paired with `jsonwebtoken` to strictly protect `/tasks` logic endpoints under isolated bearer pipelines.
