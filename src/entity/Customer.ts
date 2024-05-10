import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from "typeorm";
import { Movie } from "./Movie";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.customers)
  @JoinTable()
  movies: Movie[];
}
