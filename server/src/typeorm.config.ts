import path from "path";
import { ConnectionOptions } from "typeorm";
import { __prod__ } from "./constants";
import { PasswordResetToken } from "./entities/PasswordResetToken";
import { User } from "./entities/User";

export const typeOrmConfig: ConnectionOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: "gems",
  synchronize: !__prod__,
  logging: true,
  entities: [User, PasswordResetToken],
  migrations: [path.join(__dirname, "migrations/*")],
};
