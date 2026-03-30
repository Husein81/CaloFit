export type CreateFoodItemDto = {
  name: string;
  brand?: string;
  calories: number; // min: 0
  proteinG: number; // min: 0
  carbsG: number; // min: 0
  fatG: number; // min: 0
  servingSizeG?: number; // min: 1, default: 100
};
