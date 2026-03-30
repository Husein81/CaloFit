import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FoodItemsService } from './food-items.service';
import { CreateFoodItemDto } from './dto/create-food-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('food-items')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('food-items')
export class FoodItemsController {
  constructor(private readonly foodItemsService: FoodItemsService) {}

  @Get('search')
  @ApiQuery({ name: 'q', required: true })
  search(@Query('q') query: string) {
    return this.foodItemsService.search(query);
  }

  @Post()
  create(@Body() dto: CreateFoodItemDto) {
    return this.foodItemsService.create(dto);
  }
}
