import crypto from "crypto";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma";
import { AuthRequest } from "../types";
import { generateTokens } from "../utils";

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

export const googleAuth = async (req: Request, res: Response) => {
  try {
    const { accessToken } = req.body;
    if (!accessToken) {
      res.status(400).json({ message: "Access token is required" });
      return;
    }

    // Verify token and fetch profile from Google
    const googleRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!googleRes.ok) {
      res.status(401).json({ message: "Invalid Google token" });
      return;
    }

    const { email, name, picture } = (await googleRes.json()) as {
      sub: string;
      email: string;
      name: string;
      picture?: string;
    };

    // Find or create the user — Google users never use the password field
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          avatarUrl: picture ?? null,
          password: crypto.randomBytes(32).toString("hex"),
        },
      });
    }

    res.json(generateTokens(user.id, user.email));
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};
