import { Request, Response } from "express";
import { prisma } from "../prisma";
import { generateTokens } from "../utils";
import bcrypt from "bcryptjs";
import { AuthRequest } from "../types";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(409).json({ message: "Email already in use" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json(generateTokens(user.id, user.email));
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    res.json(generateTokens(user.id, user.email));
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const user = (req as AuthRequest).user;
    res.json(generateTokens(user.id, user.email));
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};
