import path from "path";
import { ConnectionOptions } from "typeorm";
import { __prod__ } from "./constants";

console.log(process.env.DB_HOST);

export const typeOrmConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "gems",
  synchronize: !__prod__,
  logging: true,
  entities: [],
  migrations: [path.join(__dirname, "migrations/*")],
};
