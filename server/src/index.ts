import dotenv = require('dotenv');
dotenv.config();

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';

import { resolvers, typeDefs } from './graphql';
import { connectMongoDatabase } from './database';

const port = process.env.PORT;

const mount = async (app: Application) => {
  const db = await connectMongoDatabase();

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    context: () => ({ db }),
  });

  server.applyMiddleware({ app, path: '/api' });

  app.listen(port);

  console.log(`http://localhost:${port}`);
};

mount(express());
