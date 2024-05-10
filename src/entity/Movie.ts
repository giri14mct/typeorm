import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Comment } from "./Comment";
import { Customer } from "./Customer";

export enum Genres {
  HORROR = "horror",
  ROMANCE = "romance",
  LOVE = "love",
  DRAMA = "drama",
  COMEDY = "comedy",
}

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: Genres,
    default: Genres.DRAMA,
  })
  genre: Genres;

  @Column()
  year: number;

  @OneToMany(() => Comment, (comment) => comment.movie)
  comments: Comment[];

  @ManyToMany(() => Customer, (customer) => customer.movies)
  customers: Customer[];
}
