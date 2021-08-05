import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.join(
    __dirname,
    "..",
    `.${process.env.NODE_ENV === "prod" ? "prod" : "dev"}.env`
  ),
});

import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { HelloResolver } from "./resolvers/hello";
import { buildSchema } from "type-graphql";
import { typeOrmConfig } from "./typeorm.config";
import { UserResolver } from "./resolvers/User";
import cookieParser from "cookie-parser";
import { __cookieSecret__ } from "./constants";

const PORT = process.env.PORT || 4000;

const main = async () => {
  const app = express();
  if (!__cookieSecret__) throw new Error("Cookie secret not set.");

  app.use(cookieParser(__cookieSecret__));

  await createConnection(typeOrmConfig);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(PORT);
};

main().catch(console.log);
