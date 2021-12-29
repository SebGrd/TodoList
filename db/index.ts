import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo: MongoMemoryServer;

/**
 * Connect to the in-memory database.
 */
export const connect = async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri);
};

/**
 * Drop database, close the connection and stop mongod.
 */
export const disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
};

/**
 * Remove all the data for all db collections.
 */
export const clear = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
