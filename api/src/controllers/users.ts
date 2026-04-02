import { Request, Response } from "express";
import { prisma } from "../prisma";
import { AuthRequest } from "../types";

export function getProfile(req: Request, res: Response) {
  res.json((req as AuthRequest).user);
}

export async function updateProfile(req: Request, res: Response) {
  try {
    const { id } = (req as AuthRequest).user;
    const { name, heightCm, weightKg, goalCalories } = req.body;
    const updated = await prisma.user.update({
      where: { id },
      data: { name, heightCm, weightKg, goalCalories },
    });
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteAccount(req: Request, res: Response) {
  try {
    const { id } = (req as AuthRequest).user;
    await prisma.user.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
}
