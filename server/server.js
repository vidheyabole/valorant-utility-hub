import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './db/connection.js';
import lineupRoutes from './routes/lineupRoutes.js';
import crosshairRoutes from './routes/crosshairRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static('public'));

app.use('/api/auth', authRoutes);
app.use('/api/lineups', lineupRoutes);
app.use('/api/crosshairs', crosshairRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Valorant Utility Hub API is running' });
});

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      console.log(`
╔═══════════════════════════════════════════╗
║   Valorant Utility Hub Server Running    ║
║   Port: ${PORT}                           ║
║   http://localhost:${PORT}                ║
╚═══════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();