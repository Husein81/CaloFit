import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { prisma } from "./prisma";
import {
  authRoutes,
  userRoutes,
  mealRoutes,
  workoutRoutes,
  foodItemRoutes,
} from "./routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  }),
);
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/meals", mealRoutes);
app.use("/workouts", workoutRoutes);
app.use("/food-items", foodItemRoutes);

const port = process.env.PORT ?? 5000;

prisma.$connect().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
