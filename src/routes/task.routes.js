import express from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { protect, authorize } from "../middleware/auth.middleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

router.use(protect);

router.get("/", authorize(ROLES.OWNER, ROLES.MEMBER, ROLES.VIEWER), getTasks);
router.post("/", authorize(ROLES.OWNER, ROLES.MEMBER), createTask);
router.patch("/:id", authorize(ROLES.OWNER, ROLES.MEMBER), updateTask);
router.delete("/:id", authorize(ROLES.OWNER), deleteTask);

export default router;