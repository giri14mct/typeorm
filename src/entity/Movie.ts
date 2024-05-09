import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
