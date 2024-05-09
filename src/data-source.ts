import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Movie } from "./entity/Movie";
import { MovieRating } from "./entity/MovieRating";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "giritharan",
  password: "codemancers",
  database: "hapi-learning",
  synchronize: true,
  logging: false,
  entities: [User, Movie, MovieRating],
  migrations: [],
  subscribers: [],
});
