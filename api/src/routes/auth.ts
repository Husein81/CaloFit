import { Router } from "express";
import { login, refreshToken, register } from "../controllers/auth";
import { authenticate } from "../middleware/auth";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/refresh", authenticate, refreshToken);

export default router;
