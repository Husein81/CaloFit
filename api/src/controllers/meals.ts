import { Request, Response } from "express";
import { prisma } from "../prisma";
import { AuthRequest } from "../types";
import { MealType } from "../generated/prisma/client.js";

export async function getDailySummary(req: Request, res: Response) {
  try {
    const { id, goalCalories } = (req as AuthRequest).user;
    const date = req.query.date as string | undefined;
    if (!date) {
      res.status(400).json({ message: "date query param is required" });
      return;
    }

    const entries = await prisma.mealEntry.findMany({
      where: { userId: id, date },
      include: { foodItem: true },
      orderBy: { createdAt: "asc" },
    });

    const totals = entries.reduce(
      (acc, entry) => {
        acc.calories += entry.servings * entry.foodItem.calories;
        acc.protein += entry.servings * entry.foodItem.proteinPerServing;
        acc.carbs += entry.servings * entry.foodItem.carbsPerServing;
        acc.fat += entry.servings * entry.foodItem.fatPerServing;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    );

    res.json({ date, ...totals, goalCalories: goalCalories ?? 2000, entries });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createMealEntry(req: Request, res: Response) {
  try {
    const { id } = (req as AuthRequest).user;
    const { foodItemId, mealType, servings, date } = req.body as {
      foodItemId: string;
      mealType: MealType;
      servings: number;
      date: string;
    };

    const entry = await prisma.mealEntry.create({
      data: { userId: id, foodItemId, mealType, servings, date },
    });
    res.status(201).json(entry);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteMealEntry(req: Request, res: Response) {
  try {
    const { id: userId } = (req as AuthRequest).user;
    const entryId = req.params.id as string;
    const entry = await prisma.mealEntry.findUnique({
      where: { id: entryId, userId },
    });
    if (!entry) {
      res.status(404).json({ message: "Meal entry not found" });
      return;
    }
    await prisma.mealEntry.delete({ where: { id: entryId } });
    res.status(204).send();
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
}
