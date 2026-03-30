import { WorkoutCategory } from '../entities/workout.entity';

export type WorkoutSetDto = {
  reps?: number;
  weightKg?: number;
  durationSeconds?: number;
  distanceM?: number;
};

export type WorkoutExerciseEntryDto = {
  exerciseId: string;
  exerciseName: string;
  category: WorkoutCategory; // 'cardio' | 'strength' | 'flexibility' | 'sports' | 'other'
  sets: WorkoutSetDto[];
  caloriesBurned: number; // min: 0
};

export type CreateWorkoutDto = {
  name: string;
  date: string; // ISO date string (YYYY-MM-DD)
  durationMinutes: number; // min: 1
  exercises: WorkoutExerciseEntryDto[];
};
