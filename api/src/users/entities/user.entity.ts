import { MealEntry } from "../../meals/entities/meal-entry.entity";
import { Workout } from "../../workouts/entities/workout.entity";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatarUrl?: string;
  heightCm?: number;
  weightKg?: number;
  goalCalories?: number;
  mealEntries: MealEntry[];
  workouts: Workout[];
  createdAt: Date;
  updatedAt: Date;
};
