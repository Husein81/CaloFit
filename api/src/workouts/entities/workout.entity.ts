import { User } from "../../users/entities/user.entity";

export type WorkoutCategory =
  | "cardio"
  | "strength"
  | "flexibility"
  | "sports"
  | "other";

export type WorkoutSet = {
  reps?: number;
  weightKg?: number;
  durationSeconds?: number;
  distanceM?: number;
};

export type WorkoutExerciseEntry = {
  exerciseId: string;
  exerciseName: string;
  category: WorkoutCategory;
  sets: WorkoutSet[];
  caloriesBurned: number;
};

export type Workout = {
  id: string;
  user: User;
  name: string;
  date: string;
  durationMinutes: number;
  totalCaloriesBurned: number;
  exercises: WorkoutExerciseEntry[];
  createdAt: Date;
};
