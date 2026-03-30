import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MealEntry } from './entities/meal-entry.entity';
import { CreateMealEntryDto } from './dto/create-meal-entry.dto';
import { FoodItemsService } from '../food-items/food-items.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(MealEntry)
    private readonly mealEntriesRepository: Repository<MealEntry>,
    private readonly foodItemsService: FoodItemsService,
  ) {}

  async getDailySummary(user: User, date: string) {
    const entries = await this.mealEntriesRepository.find({
      where: { user: { id: user.id }, date },
      order: { createdAt: 'ASC' },
    });

    const totals = entries.reduce(
      (acc, entry) => {
        const { foodItem, servings } = entry;
        const multiplier = servings * (foodItem.servingSizeG / 100);
        acc.totalCalories += foodItem.calories * multiplier;
        acc.totalProteinG += foodItem.proteinG * multiplier;
        acc.totalCarbsG += foodItem.carbsG * multiplier;
        acc.totalFatG += foodItem.fatG * multiplier;
        return acc;
      },
      { totalCalories: 0, totalProteinG: 0, totalCarbsG: 0, totalFatG: 0 },
    );

    return {
      date,
      ...totals,
      goalCalories: user.goalCalories ?? 2000,
      entries,
    };
  }

  async create(user: User, dto: CreateMealEntryDto): Promise<MealEntry> {
    const foodItem = await this.foodItemsService.findById(dto.foodItemId);
    const entry = this.mealEntriesRepository.create({
      user,
      foodItem,
      mealType: dto.mealType,
      servings: dto.servings,
      date: dto.date,
    });
    return this.mealEntriesRepository.save(entry);
  }

  async remove(user: User, id: string): Promise<void> {
    const entry = await this.mealEntriesRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!entry) throw new NotFoundException('Meal entry not found');
    await this.mealEntriesRepository.remove(entry);
  }
}
