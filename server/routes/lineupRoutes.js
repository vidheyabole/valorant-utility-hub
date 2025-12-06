import express from 'express';
import {
  getAllLineups,
  getLineupById,
  createLineup,
  updateLineup,
  deleteLineup,
  getLineupStats,
} from '../db/lineupDb.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filters = {
      map: req.query.map,
      agent: req.query.agent,
      ability: req.query.ability,
      userId: req.query.userId,
    };

    // FIXED: Pass requesting user ID from header
    const requestingUserId = req.headers['x-user-id'];
    const lineups = await getAllLineups(filters, requestingUserId);
    res.json(lineups);
  } catch (error) {
    console.error('Error fetching lineups:', error);
    res.status(500).json({ error: 'Failed to fetch lineups' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const stats = await getLineupStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching lineup stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const lineup = await getLineupById(req.params.id);
    if (!lineup) {
      return res.status(404).json({ error: 'Lineup not found' });
    }
    res.json(lineup);
  } catch (error) {
    console.error('Error fetching lineup:', error);
    res.status(500).json({ error: 'Failed to fetch lineup' });
  }
});

router.post('/', async (req, res) => {
  try {
    const lineupData = req.body;

    if (!lineupData.map || !lineupData.agent || !lineupData.ability) {
      return res.status(400).json({
        error: 'Missing required fields: map, agent, ability',
      });
    }

    const newLineup = await createLineup(lineupData);
    res.status(201).json(newLineup);
  } catch (error) {
    console.error('Error creating lineup:', error);
    res.status(500).json({ error: 'Failed to create lineup' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedLineup = await updateLineup(req.params.id, req.body);
    if (!updatedLineup) {
      return res.status(404).json({ error: 'Lineup not found' });
    }
    res.json(updatedLineup);
  } catch (error) {
    console.error('Error updating lineup:', error);
    res.status(500).json({ error: 'Failed to update lineup' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteLineup(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Lineup not found' });
    }
    res.json({ message: 'Lineup deleted successfully' });
  } catch (error) {
    console.error('Error deleting lineup:', error);
    res.status(500).json({ error: 'Failed to delete lineup' });
  }
});

export default router;