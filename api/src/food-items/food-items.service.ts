import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { FoodItem } from './entities/food-item.entity';
import { CreateFoodItemDto } from './dto/create-food-item.dto';

@Injectable()
export class FoodItemsService {
  constructor(
    @InjectRepository(FoodItem)
    private readonly foodItemsRepository: Repository<FoodItem>,
  ) {}

  async search(query: string): Promise<FoodItem[]> {
    return this.foodItemsRepository.find({
      where: { name: ILike(`%${query}%`) },
      take: 20,
    });
  }

  async findById(id: string): Promise<FoodItem> {
    const item = await this.foodItemsRepository.findOne({ where: { id } });
    if (!item) throw new NotFoundException('Food item not found');
    return item;
  }

  async create(dto: CreateFoodItemDto): Promise<FoodItem> {
    const item = this.foodItemsRepository.create({ ...dto, isCustom: true });
    return this.foodItemsRepository.save(item);
  }
}
