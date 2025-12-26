/**
 * Voting Routes
 * All routes related to voting operations
 */

import express from 'express';
import * as votingController from '../controllers/votingController.js';

const router = express.Router();

// GET /api/participants - Get all participants
router.get('/participants', votingController.getParticipants);

// GET /api/scores - Get current scores
router.get('/scores', votingController.getScores);

// POST /api/vote - Submit a vote
router.post('/vote', votingController.submitVote);

// GET /api/votes - Get all votes
router.get('/votes', votingController.getAllVotes);

// POST /api/submit-food - Submit a new food item
router.post('/submit-food', votingController.submitFood);

// POST /api/reset - Reset all data
router.post('/reset', votingController.resetData);

export default router;
