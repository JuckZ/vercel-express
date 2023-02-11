import { Db, MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

let mongoClient: MongoClient = null;
let database: Db = null;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env.local');
}

export async function connectToDatabase() {
  try {
    if (mongoClient && database) {
      return { mongoClient, database };
    }
    if (process.env.NODE_ENV === 'development') {
      // @ts-ignore
      if (!global._mongoClient) {
        // @ts-ignore
        mongoClient = await new MongoClient(uri, options).connect();
        // @ts-ignore
        global._mongoClient = mongoClient;
      } else {
        // @ts-ignore
        mongoClient = global._mongoClient;
      }
    } else {
      // @ts-ignore
      mongoClient = await new MongoClient(uri, options).connect();
    }
    database = await mongoClient.db(process.env.ATLAS_DATABASE);
    return { mongoClient, database };
  } catch (e) {
    console.error(e);
  }
}
