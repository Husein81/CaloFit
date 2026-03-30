import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateFoodItemDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  calories: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  proteinG: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  carbsG: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  fatG: number;

  @ApiPropertyOptional({ default: 100 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  servingSizeG?: number;
}
