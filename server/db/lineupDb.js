import { ObjectId } from 'mongodb';
import { getDb } from './connection.js';

const COLLECTION_NAME = 'lineups';

export async function getAllLineups(filters = {}, requestingUserId = null) {
  const db = getDb();
  const query = {};

  if (filters.map) query.map = filters.map;
  if (filters.agent) query.agent = filters.agent;
  if (filters.ability) query.ability = filters.ability;
  
  // If userId filter is provided, show ALL lineups for that user (public and private)
  if (filters.userId) {
    query.userId = new ObjectId(filters.userId);
  } else {
    // Show public lineups + private lineups that belong to the requesting user
    if (requestingUserId) {
      query.$or = [
        { isPrivate: { $ne: true } },
        { isPrivate: { $exists: false } },
        { userId: new ObjectId(requestingUserId), isPrivate: true }
      ];
    } else {
      // Not logged in - only show public
      query.$or = [
        { isPrivate: { $ne: true } },
        { isPrivate: { $exists: false } }
      ];
    }
  }

  const lineups = await db
    .collection(COLLECTION_NAME)
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();

  return lineups;
}

export async function getLineupById(id) {
  const db = getDb();
  const lineup = await db
    .collection(COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id) });
  return lineup;
}

export async function createLineup(lineupData) {
  const db = getDb();
  const lineup = {
    ...lineupData,
    userId: lineupData.userId ? new ObjectId(lineupData.userId) : null,
    isPrivate: lineupData.isPrivate || false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection(COLLECTION_NAME).insertOne(lineup);
  return { _id: result.insertedId, ...lineup };
}

export async function updateLineup(id, lineupData, userId = null) {
  const db = getDb();
  
  if (userId) {
    const existing = await getLineupById(id);
    if (existing && existing.userId && existing.userId.toString() !== userId) {
      throw new Error('Not authorized to update this lineup');
    }
  }

  const update = {
    ...lineupData,
    updatedAt: new Date(),
  };

  const result = await db
    .collection(COLLECTION_NAME)
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: 'after' }
    );

  return result;
}

export async function deleteLineup(id, userId = null) {
  const db = getDb();
  
  if (userId) {
    const existing = await getLineupById(id);
    if (existing && existing.userId && existing.userId.toString() !== userId) {
      throw new Error('Not authorized to delete this lineup');
    }
  }

  const result = await db
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

export async function getLineupStats() {
  const db = getDb();

  const stats = await db
    .collection(COLLECTION_NAME)
    .aggregate([
      {
        $match: {
          $or: [
            { isPrivate: { $ne: true } },
            { isPrivate: { $exists: false } }
          ]
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          byMap: { $push: '$map' },
          byAgent: { $push: '$agent' },
        },
      },
    ])
    .toArray();

  return stats[0] || { total: 0, byMap: [], byAgent: [] };
}