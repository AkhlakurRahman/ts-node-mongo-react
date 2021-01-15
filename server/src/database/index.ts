import { MongoClient } from 'mongodb';

const user = 'akr';
const password = 'iXAUY40yuP1ujWdC';
const cluster = 'cluster0.hxdz8';

const url = `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/<dbname>?retryWrites=true&w=majority`;

export const connectMongoDatabase = async () => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('main');

  return {
    listings: db.collection('test_listings'),
  };
};
