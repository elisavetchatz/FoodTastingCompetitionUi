/**
 * Talent Voting Routes
 * All routes related to talent voting operations
 */

import express from 'express';
import * as talentController from '../controllers/talentController.js';

const router = express.Router();

// GET /api/talent/all-scores - Get scores for all categories
router.get('/all-scores', talentController.getAllTalentScores);

// GET /api/talent/:category/participants - Get all participants for a category
router.get('/:category/participants', talentController.getTalentParticipants);

// GET /api/talent/:category/scores - Get scores for a category
router.get('/:category/scores', talentController.getTalentScores);

// POST /api/talent/:category/vote - Submit a vote for a category
router.post('/:category/vote', talentController.submitTalentVote);

// GET /api/talent/:category/votes - Get all votes for a category
router.get('/:category/votes', talentController.getAllTalentVotes);

// POST /api/talent/:category/submit-performer - Submit a new performer
router.post('/:category/submit-performer', talentController.submitPerformer);

// POST /api/talent/:category/reset - Reset data for a category
router.post('/:category/reset', talentController.resetTalentData);

export default router;
