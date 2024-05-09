import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Photo } from "./entity/Photo";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "giritharan",
  password: "codemancers",
  database: "hapi-learning",
  synchronize: true,
  logging: false,
  entities: [User, Photo],
  migrations: [],
  subscribers: [],
});
