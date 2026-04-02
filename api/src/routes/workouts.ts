import { Router } from "express";
import { getWorkouts, getWorkout, createWorkout, deleteWorkout } from "../controllers/workouts";
import { authenticate } from "../middleware/auth";

const router = Router();

router.use(authenticate);

router.get("/", getWorkouts);
router.get("/:id", getWorkout);
router.post("/", createWorkout);
router.delete("/:id", deleteWorkout);

export default router;
