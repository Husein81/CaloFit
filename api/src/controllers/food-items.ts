import { Request, Response } from "express";
import { prisma } from "../prisma";

export async function searchFoodItems(req: Request, res: Response) {
  try {
    const { q } = req.query as { q: string };
    if (!q) {
      res.status(400).json({ message: "q query param is required" });
      return;
    }

    const items = await prisma.foodItem.findMany({
      where: { name: { contains: q, mode: "insensitive" } },
      take: 20,
    });
    res.json(items);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createFoodItem(req: Request, res: Response) {
  try {
    const { name, brand, calories, proteinPerServing, carbsPerServing, fatPerServing, servingSize } = req.body;
    const item = await prisma.foodItem.create({
      data: { name, brand, calories, proteinPerServing, carbsPerServing, fatPerServing, servingSize, isCustom: true },
    });
    res.status(201).json(item);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
}
