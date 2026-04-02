import { Router } from "express";
import { getProfile, updateProfile, deleteAccount } from "../controllers/users";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);

router.get("/me", getProfile);
router.patch("/me", updateProfile);
router.delete("/me", deleteAccount);

export default router;
