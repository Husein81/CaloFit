import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export type WorkoutCategory =
  | 'cardio'
  | 'strength'
  | 'flexibility'
  | 'sports'
  | 'other';

export interface WorkoutSet {
  reps?: number;
  weightKg?: number;
  durationSeconds?: number;
  distanceM?: number;
}

export interface WorkoutExerciseEntry {
  exerciseId: string;
  exerciseName: string;
  category: WorkoutCategory;
  sets: WorkoutSet[];
  caloriesBurned: number;
}

@Entity('workouts')
export class Workout {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.workouts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  name: string;

  @Column({ type: 'date' })
  date: string;

  @Column({ type: 'int' })
  durationMinutes: number;

  @Column({ type: 'float', default: 0 })
  totalCaloriesBurned: number;

  @Column({ type: 'jsonb', default: [] })
  exercises: WorkoutExerciseEntry[];

  @CreateDateColumn()
  createdAt: Date;
}
