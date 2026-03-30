import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('food_items')
export class FoodItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  brand?: string;

  @Column({ type: 'float' })
  calories: number;

  @Column({ type: 'float' })
  proteinG: number;

  @Column({ type: 'float' })
  carbsG: number;

  @Column({ type: 'float' })
  fatG: number;

  @Column({ type: 'float', default: 100 })
  servingSizeG: number;

  @Column({ default: false })
  isCustom: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
