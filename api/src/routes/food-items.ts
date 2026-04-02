import { Router } from "express";
import { searchFoodItems, createFoodItem } from "../controllers/food-items";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);

router.get("/search", searchFoodItems);
router.post("/", createFoodItem);

export default router;
