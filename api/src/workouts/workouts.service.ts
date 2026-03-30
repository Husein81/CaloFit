import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { Workout } from "./entities/workout.entity";
import { CreateWorkoutDto } from "./dto/create-workout.dto";
import { User } from "../users/entities/user.entity";

@Injectable()
export class WorkoutsService {
  constructor(private readonly workoutsRepository: Repository<Workout>) {}

  async findAll(user: User, date?: string): Promise<Workout[]> {
    const where: any = { user: { id: user.id } };
    if (date) where.date = date;

    return this.workoutsRepository.find({
      where,
      order: { createdAt: "DESC" },
    });
  }

  async findOne(user: User, id: string): Promise<Workout> {
    const workout = await this.workoutsRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!workout) throw new NotFoundException("Workout not found");
    return workout;
  }

  async create(user: User, dto: CreateWorkoutDto): Promise<Workout> {
    const totalCaloriesBurned = dto.exercises.reduce(
      (sum, ex) => sum + ex.caloriesBurned,
      0,
    );

    const workout = this.workoutsRepository.create({
      user,
      name: dto.name,
      date: dto.date,
      durationMinutes: dto.durationMinutes,
      exercises: dto.exercises,
      totalCaloriesBurned,
    });

    return this.workoutsRepository.save(workout);
  }

  async remove(user: User, id: string): Promise<void> {
    const workout = await this.findOne(user, id);
    await this.workoutsRepository.remove(workout);
  }
}
