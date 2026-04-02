import { Request, Response } from "express";
import { prisma } from "../prisma";
import { AuthRequest } from "../types";

type WorkoutSet = {
  reps?: number;
  weightKg?: number;
  durationSeconds?: number;
  distanceM?: number;
};

type WorkoutExerciseEntry = {
  exerciseId: string;
  exerciseName: string;
  category: string;
  sets: WorkoutSet[];
  caloriesBurned: number;
};

export async function getWorkouts(req: Request, res: Response) {
  try {
    const { id } = (req as AuthRequest).user;
    const date = req.query.date as string | undefined;
    const where: any = { userId: id };
    if (date) where.date = date;

    const workouts = await prisma.workout.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    res.json(workouts);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getWorkout(req: Request, res: Response) {
  try {
    const { id: userId } = (req as AuthRequest).user;
    const workoutId = req.params.id as string;
    const workout = await prisma.workout.findUnique({
      where: { id: workoutId, userId },
    });
    if (!workout) {
      res.status(404).json({ message: "Workout not found" });
      return;
    }
    res.json(workout);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createWorkout(req: Request, res: Response) {
  try {
    const { id } = (req as AuthRequest).user;
    const { name, date, durationMinutes, exercises } = req.body as {
      name: string;
      date: string;
      durationMinutes: number;
      exercises: WorkoutExerciseEntry[];
    };

    const totalCaloriesBurned = exercises.reduce(
      (sum, ex) => sum + ex.caloriesBurned,
      0,
    );

    const workout = await prisma.workout.create({
      data: { userId: id, name, date, durationMinutes, exercises, totalCaloriesBurned },
    });
    res.status(201).json(workout);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteWorkout(req: Request, res: Response) {
  try {
    const { id: userId } = (req as AuthRequest).user;
    const workoutId = req.params.id as string;
    const workout = await prisma.workout.findUnique({
      where: { id: workoutId, userId },
    });
    if (!workout) {
      res.status(404).json({ message: "Workout not found" });
      return;
    }
    await prisma.workout.delete({ where: { id: workoutId } });
    res.status(204).send();
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
}
