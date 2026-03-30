import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { MealEntry } from './entities/meal-entry.entity';
import { FoodItemsModule } from '../food-items/food-items.module';

@Module({
  imports: [TypeOrmModule.forFeature([MealEntry]), FoodItemsModule],
  controllers: [MealsController],
  providers: [MealsService],
})
export class MealsModule {}
