import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, IsInt, Min, Max } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  @IsInt()
  @Min(0)
  @Max(10)
  age: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;
}
