export type FoodItem = {
  id: string;
  name: string;
  brand?: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  servingSizeG: number;
  isCustom: boolean;
  createdAt: Date;
};
