import { connectToDatabase, closeConnection } from './connection.js';

const accurateLineups = [
  {
    map: 'Ascent',
    agent: 'Sova',
    ability: 'Recon',
    site: 'A Site',
    position: 'Attack',
    description: 'Main entrance recon dart. Stand at the double doors near mid, aim at the corner of the building above site, and shoot the dart to reveal defenders on site and behind the boxes.',
    landmark: 'Double doors near mid',
    throwType: 'Standing Throw',
    videoUrl: null,
    author: 'Admin',
    images: [],
    tags: ['recon', 'attack', 'a-site'],
    isPrivate: false,
    userId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    map: 'Bind',
    agent: 'Brimstone',
    ability: 'Smoke',
    site: 'A Site',
    position: 'Attack',
    description: 'A site execute smoke. Smoke hookah window and truck to block defender vision. Allows your team to safely plant on site.',
    landmark: 'A short',
    throwType: 'Standing Throw',
    videoUrl: null,
    author: 'Admin',
    images: [],
    tags: ['smoke', 'attack', 'execute'],
    isPrivate: false,
    userId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    map: 'Haven',
    agent: 'Viper',
    ability: 'Molly',
    site: 'C Site',
    position: 'Post-Plant',
    description: 'Post-plant molly for default plant. Stand at back site near cubby, aim at the top of the box, throw molly to deny the defuse.',
    landmark: 'Back site cubby',
    throwType: 'Jump Throw',
    videoUrl: null,
    author: 'Admin',
    images: [],
    tags: ['molly', 'post-plant', 'c-site'],
    isPrivate: false,
    userId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    map: 'Split',
    agent: 'Sova',
    ability: 'Recon',
    site: 'B Site',
    position: 'Attack',
    description: 'B main recon dart. Stand at B main entrance, aim at the sky above the pillar, shoot dart to scan entire B site and heaven.',
    landmark: 'B main entrance',
    throwType: 'Standing Throw',
    videoUrl: null,
    author: 'Admin',
    images: [],
    tags: ['recon', 'attack', 'b-site'],
    isPrivate: false,
    userId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    map: 'Icebox',
    agent: 'KAY/O',
    ability: 'Molly',
    site: 'A Site',
    position: 'Post-Plant',
    description: 'Default plant post-plant molly. Throw from belt to land on default plant spot. Forces enemies off the defuse.',
    landmark: 'Belt area',
    throwType: 'Standing Throw',
    videoUrl: null,
    author: 'Admin',
    images: [],
    tags: ['molly', 'post-plant', 'default'],
    isPrivate: false,
    userId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const accurateCrosshairs = [
  {
    name: 'TenZ Classic',
    code: '0;P;c;5;h;0;f;0;0l;4;0o;2;0a;1;0f;0;1b;0',
    category: 'Pro Player',
    color: 'Cyan',
    thickness: 2,
    length: 4,
    centerDot: false,
    outlines: true,
    showSpectators: false,
    disableFiring: false,
    disableMovement: false,
    author: 'TenZ',
    description: 'TenZ signature crosshair - clean cyan cross without center dot, perfect for precision aiming.',
    imageUrl: null,
    tags: ['pro', 'minimal', 'cyan'],
    isPrivate: false,
    userId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Shroud Dot',
    code: '0;P;c;1;o;1;d;1;z;3;f;0;s;0;0t;1;0l;2;0o;2;0a;1;0f;0;1b;0',
    category: 'Dot Only',
    color: 'White',
    thickness: 3,
    length: 0,
    centerDot: true,
    outlines: true,
    showSpectators: false,
    disableFiring: false,
    disableMovement: false,
    author: 'Shroud',
    description: 'Simple white dot - maximizes visibility and minimizes screen clutter. Great for one-taps.',
    imageUrl: null,
    tags: ['dot', 'minimal', 'pro'],
    isPrivate: false,
    userId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Classic Green Cross',
    code: '0;P;c;4;h;0;f;0;0l;4;0o;0;0a;1;0f;0;1b;0',
    category: 'Classic',
    color: 'Green',
    thickness: 2,
    length: 4,
    centerDot: false,
    outlines: false,
    showSpectators: false,
    disableFiring: false,
    disableMovement: false,
    author: 'Admin',
    description: 'Traditional green crosshair - easy on the eyes and visible on most backgrounds.',
    imageUrl: null,
    tags: ['classic', 'green', 'traditional'],
    isPrivate: false,
    userId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Scream Crosshair',
    code: '0;P;c;5;h;0;f;0;0l;3;0o;2;0a;1;0f;0;1b;0',
    category: 'Pro Player',
    color: 'Cyan',
    thickness: 2,
    length: 3,
    centerDot: false,
    outlines: true,
    showSpectators: false,
    disableFiring: false,
    disableMovement: false,
    author: 'ScreaM',
    description: 'ScreaM small cyan cross - designed for headshot precision and tap firing.',
    imageUrl: null,
    tags: ['pro', 'small', 'precision'],
    isPrivate: false,
    userId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Minimal Yellow',
    code: '0;P;c;8;h;0;f;0;0l;2;0o;2;0a;1;0f;0;1b;0',
    category: 'Minimal',
    color: 'Yellow',
    thickness: 2,
    length: 2,
    centerDot: false,
    outlines: true,
    showSpectators: false,
    disableFiring: false,
    disableMovement: false,
    author: 'Admin',
    description: 'Tiny yellow cross - extremely minimal design that stays visible without obstructing view.',
    imageUrl: null,
    tags: ['minimal', 'small', 'yellow'],
    isPrivate: false,
    userId: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedDatabase() {
  try {
    const db = await connectToDatabase();

    await db.collection('lineups').deleteMany({});
    await db.collection('crosshairs').deleteMany({});

    console.log('Cleared existing data...');

    console.log('Inserting accurate lineups...');
    await db.collection('lineups').insertMany(accurateLineups);
    console.log(`✓ ${accurateLineups.length} accurate lineups inserted`);

    console.log('Inserting accurate crosshairs...');
    await db.collection('crosshairs').insertMany(accurateCrosshairs);
    console.log(`✓ ${accurateCrosshairs.length} accurate crosshairs inserted`);

    const lineupCount = await db.collection('lineups').countDocuments();
    const crosshairCount = await db.collection('crosshairs').countDocuments();

    console.log('\n=== Database Seeded Successfully ===');
    console.log(`Total Lineups: ${lineupCount}`);
    console.log(`Total Crosshairs: ${crosshairCount}`);
    console.log(`Total Records: ${lineupCount + crosshairCount}`);
    console.log('\nYou can now add your own accurate lineups and crosshairs!');

    await closeConnection();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();