import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import swaggerUi from "swagger-ui-express";
import taskRoutes from "./routes/task.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.resolve("src/docs/swagger.json"), "utf8")
);

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);

app.use(errorHandler);

export default app;