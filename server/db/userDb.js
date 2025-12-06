import { ObjectId } from 'mongodb';
import { getDb } from './connection.js';
import bcrypt from 'bcrypt';

const COLLECTION_NAME = 'users';

export async function createUser(userData) {
  const db = getDb();
  
  const existingUser = await db.collection(COLLECTION_NAME).findOne({
    email: userData.email.toLowerCase(),
  });

  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);

  const user = {
    username: userData.username,
    email: userData.email.toLowerCase(),
    password: hashedPassword,
    profilePicture: userData.profilePicture || null,
    rankImage: userData.rankImage || null,
    bio: userData.bio || '',
    rank: userData.rank || 'Unranked',
    favoriteAgent: userData.favoriteAgent || '',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await db.collection(COLLECTION_NAME).insertOne(user);
  
  const { password, ...userWithoutPassword } = user;
  return { _id: result.insertedId, ...userWithoutPassword };
}

export async function findUserByEmail(email) {
  const db = getDb();
  const user = await db.collection(COLLECTION_NAME).findOne({
    email: email.toLowerCase(),
  });
  return user;
}

export async function findUserById(id) {
  const db = getDb();
  const user = await db.collection(COLLECTION_NAME).findOne({
    _id: new ObjectId(id),
  });
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  return null;
}

export async function validateUser(email, password) {
  const user = await findUserByEmail(email);
  
  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password);
  
  if (!isValid) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function updateUser(id, updateData) {
  const db = getDb();
  
  const update = {
    ...updateData,
    updatedAt: new Date(),
  };

  delete update.password;
  delete update.email;

  const result = await db
    .collection(COLLECTION_NAME)
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: 'after' }
    );

  if (result) {
    const { password, ...userWithoutPassword } = result;
    return userWithoutPassword;
  }
  return null;
}

export async function updateUserPassword(id, oldPassword, newPassword) {
  const db = getDb();
  const user = await db.collection(COLLECTION_NAME).findOne({
    _id: new ObjectId(id),
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isValid = await bcrypt.compare(oldPassword, user.password);
  if (!isValid) {
    throw new Error('Current password is incorrect');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db.collection(COLLECTION_NAME).updateOne(
    { _id: new ObjectId(id) },
    { $set: { password: hashedPassword, updatedAt: new Date() } }
  );

  return true;
}

export async function getUserStats(userId) {
  const db = getDb();

  const lineupCount = await db.collection('lineups').countDocuments({
    userId: new ObjectId(userId),
  });

  const crosshairCount = await db.collection('crosshairs').countDocuments({
    userId: new ObjectId(userId),
  });

  return {
    lineups: lineupCount,
    crosshairs: crosshairCount,
    total: lineupCount + crosshairCount,
  };
}