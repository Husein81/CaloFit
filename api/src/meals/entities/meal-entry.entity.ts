import { FoodItem } from "../../food-items/entities/food-item.entity";
import { User } from "../../users/entities/user.entity";

export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export type MealEntry = {
  id: string;
  user: User;
  foodItem: FoodItem;
  mealType: MealType;
  servings: number;
  date: string;
  createdAt: Date;
};
