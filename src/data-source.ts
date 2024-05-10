import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Movie } from "./entity/Movie";
import { MovieRating } from "./entity/MovieRating";
import { Customer } from "./entity/Customer";
import { Comment } from "./entity/Comment";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "giritharan",
  password: "codemancers",
  database: "hapi-learning",
  synchronize: true,
  logging: true,
  entities: [User, Movie, MovieRating, Customer, Comment],
  migrations: [],
  subscribers: [],
});
