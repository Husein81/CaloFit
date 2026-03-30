import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsDateString,
  IsArray,
  IsIn,
  ValidateNested,
  IsOptional,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { WorkoutCategory } from '../entities/workout.entity';

class WorkoutSetDto {
  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  reps?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  weightKg?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  durationSeconds?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  distanceM?: number;
}

class WorkoutExerciseEntryDto {
  @ApiProperty()
  @IsString()
  exerciseId: string;

  @ApiProperty()
  @IsString()
  exerciseName: string;

  @ApiProperty({
    enum: ['cardio', 'strength', 'flexibility', 'sports', 'other'],
  })
  @IsIn(['cardio', 'strength', 'flexibility', 'sports', 'other'])
  category: WorkoutCategory;

  @ApiProperty({ type: [WorkoutSetDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutSetDto)
  sets: WorkoutSetDto[];

  @ApiProperty()
  @IsNumber()
  @Min(0)
  caloriesBurned: number;
}

export class CreateWorkoutDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ example: '2026-03-30' })
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  durationMinutes: number;

  @ApiProperty({ type: [WorkoutExerciseEntryDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutExerciseEntryDto)
  exercises: WorkoutExerciseEntryDto[];
}
