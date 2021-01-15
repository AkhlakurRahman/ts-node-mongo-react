import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';

import { resolvers, typeDefs } from './graphql';
import { connectMongoDatabase } from './database';

const port = 8888;

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

  const listings = await db.listings.find({}).toArray();
  console.log(listings);
};

mount(express());
