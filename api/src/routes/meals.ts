import { Router } from "express";
import { getDailySummary, createMealEntry, deleteMealEntry } from "../controllers/meals";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);

router.get("/daily", getDailySummary);
router.post("/", createMealEntry);
router.delete("/:id", deleteMealEntry);

export default router;
