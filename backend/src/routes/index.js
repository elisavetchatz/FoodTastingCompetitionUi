/**
 * Main API Routes
 * Mounts all route modules
 */

import express from 'express';
import votingRoutes from './votingRoutes.js';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Food Tasting Competition API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Mount voting routes
router.use('/', votingRoutes);

export default router;
