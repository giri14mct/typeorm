import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Movie } from "./Movie";
import { MinLength } from "class-validator";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MinLength(5)
  text: string;

  @ManyToOne(() => Movie, (movie) => movie.comments)
  movie: Movie;
}
