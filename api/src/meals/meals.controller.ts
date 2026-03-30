import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MealsService } from './meals.service';
import { CreateMealEntryDto } from './dto/create-meal-entry.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('meals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('meals')
export class MealsController {
  constructor(private readonly mealsService: MealsService) {}

  @Get('daily')
  @ApiQuery({ name: 'date', required: true, example: '2026-03-30' })
  getDailySummary(@CurrentUser() user: User, @Query('date') date: string) {
    return this.mealsService.getDailySummary(user, date);
  }

  @Post()
  create(@CurrentUser() user: User, @Body() dto: CreateMealEntryDto) {
    return this.mealsService.create(user, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@CurrentUser() user: User, @Param('id') id: string) {
    return this.mealsService.remove(user, id);
  }
}
