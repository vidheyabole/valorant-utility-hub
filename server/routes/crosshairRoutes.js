import express from 'express';
import {
  getAllCrosshairs,
  getCrosshairById,
  createCrosshair,
  updateCrosshair,
  deleteCrosshair,
  getCrosshairStats,
} from '../db/crosshairDb.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const filters = {
      category: req.query.category,
      color: req.query.color,
      userId: req.query.userId,
    };

    // FIXED: Pass requesting user ID from header
    const requestingUserId = req.headers['x-user-id'];
    const crosshairs = await getAllCrosshairs(filters, requestingUserId);
    res.json(crosshairs);
  } catch (error) {
    console.error('Error fetching crosshairs:', error);
    res.status(500).json({ error: 'Failed to fetch crosshairs' });
  }
});

router.get('/stats', async (req, res) => {
  try {
    const stats = await getCrosshairStats();
    res.json(stats);
  } catch (error) {
    console.error('Error fetching crosshair stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const crosshair = await getCrosshairById(req.params.id);
    if (!crosshair) {
      return res.status(404).json({ error: 'Crosshair not found' });
    }
    res.json(crosshair);
  } catch (error) {
    console.error('Error fetching crosshair:', error);
    res.status(500).json({ error: 'Failed to fetch crosshair' });
  }
});

router.post('/', async (req, res) => {
  try {
    const crosshairData = req.body;

    if (!crosshairData.name || !crosshairData.code) {
      return res.status(400).json({
        error: 'Missing required fields: name, code',
      });
    }

    const newCrosshair = await createCrosshair(crosshairData);
    res.status(201).json(newCrosshair);
  } catch (error) {
    console.error('Error creating crosshair:', error);
    res.status(500).json({ error: 'Failed to create crosshair' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedCrosshair = await updateCrosshair(req.params.id, req.body);
    if (!updatedCrosshair) {
      return res.status(404).json({ error: 'Crosshair not found' });
    }
    res.json(updatedCrosshair);
  } catch (error) {
    console.error('Error updating crosshair:', error);
    res.status(500).json({ error: 'Failed to update crosshair' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await deleteCrosshair(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Crosshair not found' });
    }
    res.json({ message: 'Crosshair deleted successfully' });
  } catch (error) {
    console.error('Error deleting crosshair:', error);
    res.status(500).json({ error: 'Failed to delete crosshair' });
  }
});

export default router;