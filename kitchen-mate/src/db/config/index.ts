import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URI as string;

const DB_NAME = "kitchenmate";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const db = client.db(DB_NAME);
export const getCollection = (collectionName: string) => {
  return db.collection(collectionName);
};
