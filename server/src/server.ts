import dotenv from "dotenv";
import path from "path";
import { __prod__ } from "./constants";

dotenv.config({
  path: path.join(__dirname, "..", `.${__prod__ ? "prod" : "dev"}.env`),
});

import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { HelloResolver } from "./resolvers/hello";
import { buildSchema } from "type-graphql";
import { typeOrmConfig } from "./typeorm.config";

const PORT = process.env.PORT || 4000;

const main = async () => {
  const app = express();

  await createConnection(typeOrmConfig);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(PORT);
};

main().catch(console.log);
