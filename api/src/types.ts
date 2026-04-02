import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    avatarUrl: string | null;
    heightCm: number | null;
    weightKg: number | null;
    goalCalories: number | null;
    createdAt: Date;
    updatedAt: Date;
  };
}
