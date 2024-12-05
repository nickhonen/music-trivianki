import { Router } from 'express';
import { db } from '../db';
import { songsTable } from '../db/schema';

const router = Router();

router.get('/next/:userId', async (req, res) => {
  // Implement next song logic based on spaced repetition
  res.json({ message: 'To be implemented' });
});

export default router;