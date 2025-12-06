import { ObjectId } from 'mongodb';
import { getDb } from './connection.js';

const COLLECTION_NAME = 'crosshairs';

export async function getAllCrosshairs(filters = {}, requestingUserId = null) {
  const db = getDb();
  const query = {};

  if (filters.category) query.category = filters.category;
  if (filters.color) query.color = filters.color;
  
  // If userId filter is provided, show ALL crosshairs for that user (public and private)
  if (filters.userId) {
    query.userId = new ObjectId(filters.userId);
  } else {
    // Show public crosshairs + private crosshairs that belong to the requesting user
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

  const crosshairs = await db
    .collection(COLLECTION_NAME)
    .find(query)
    .sort({ createdAt: -1 })
    .toArray();

  return crosshairs;
}

export async function getCrosshairById(id) {
  const db = getDb();
  const crosshair = await db
    .collection(COLLECTION_NAME)
    .findOne({ _id: new ObjectId(id) });
  return crosshair;
}

export async function createCrosshair(crosshairData) {
  const db = getDb();
  const crosshair = {
    ...crosshairData,
    userId: crosshairData.userId ? new ObjectId(crosshairData.userId) : null,
    isPrivate: crosshairData.isPrivate || false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection(COLLECTION_NAME).insertOne(crosshair);
  return { _id: result.insertedId, ...crosshair };
}

export async function updateCrosshair(id, crosshairData, userId = null) {
  const db = getDb();
  
  if (userId) {
    const existing = await getCrosshairById(id);
    if (existing && existing.userId && existing.userId.toString() !== userId) {
      throw new Error('Not authorized to update this crosshair');
    }
  }

  const update = {
    ...crosshairData,
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

export async function deleteCrosshair(id, userId = null) {
  const db = getDb();
  
  if (userId) {
    const existing = await getCrosshairById(id);
    if (existing && existing.userId && existing.userId.toString() !== userId) {
      throw new Error('Not authorized to delete this crosshair');
    }
  }

  const result = await db
    .collection(COLLECTION_NAME)
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

export async function getCrosshairStats() {
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
          byCategory: { $push: '$category' },
          byColor: { $push: '$color' },
        },
      },
    ])
    .toArray();

  return stats[0] || { total: 0, byCategory: [], byColor: [] };
}