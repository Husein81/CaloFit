import { MealType } from "../entities/meal-entry.entity";

export type CreateMealEntryDto = {
  foodItemId: string;
  mealType: MealType;
  servings: number;
  date: string;
};
