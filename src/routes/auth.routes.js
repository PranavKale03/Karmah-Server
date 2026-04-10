import express from "express";
import { registerUser, loginUser, demoLogin, getMe } from "../controllers/auth.controller.js";
import { demoProtect, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/demo", demoProtect, demoLogin);
router.get("/me", protect, getMe);

export default router;
