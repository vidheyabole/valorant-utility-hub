import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.MONGODB_URI;
const client = new MongoClient(connectionString);

let db;

export async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('valorant_hub');
    return db;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

export function getDb() {
  if (!db) {
    throw new Error('Database not initialized. Call connectToDatabase first.');
  }
  return db;
}

export async function closeConnection() {
  await client.close();
  console.log('MongoDB connection closed');
}