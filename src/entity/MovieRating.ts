import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Movie } from "./Movie";

@Entity()
export class MovieRating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  rating: number;

  @Column({ type: "float", nullable: true })
  duration: number;

  @OneToOne(() => Movie)
  @JoinColumn()
  movie: Movie;
}
