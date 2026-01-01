/**
 * Talent Voting Controller
 * Handles HTTP requests for talent voting operations
 */

import { successResponse, errorResponse } from '../utils/responses.js';
import { SUCCESS_MESSAGES, ERROR_MESSAGES, HTTP_STATUS } from '../config/constants.js';
import { loadTalentData, saveTalentData } from '../utils/storage.js';

// Load talent data from file on startup
const initialData = loadTalentData();
let talentData = initialData;
const maxPlayers = 20;

// Categories
const CATEGORIES = {
  ATHLETIC: 'athleticPerformance',
  DANCE_MUSICAL: 'danceMusicalPerformance',
  THEATRICAL: 'theatricalPerformance'
};

/**
 * Get all participants for a category
 * GET /api/talent/:category/participants
 */
export const getTalentParticipants = (req, res) => {
  try {
    const { category } = req.params;
    
    if (!talentData[category]) {
      return errorResponse(res, 'Invalid category', HTTP_STATUS.BAD_REQUEST);
    }

    return successResponse(
      res,
      { 
        participants: talentData[category].participantData,
        maxPlayers,
        category
      },
      SUCCESS_MESSAGES.PARTICIPANTS_RETRIEVED,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(res, ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Get scores for a category
 * GET /api/talent/:category/scores
 */
export const getTalentScores = (req, res) => {
  try {
    const { category } = req.params;
    
    if (!talentData[category]) {
      return errorResponse(res, 'Invalid category', HTTP_STATUS.BAD_REQUEST);
    }

    const sortedScores = Object.entries(talentData[category].scores)
      .sort(([, a], [, b]) => b - a)
      .map(([name, score]) => ({ name, score }));

    return successResponse(
      res,
      { 
        scores: sortedScores,
        currentPlayer: talentData[category].currentPlayer,
        category
      },
      SUCCESS_MESSAGES.SCORES_RETRIEVED,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(res, ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Get all scores for all categories
 * GET /api/talent/all-scores
 */
export const getAllTalentScores = (req, res) => {
  try {
    const allScores = {};
    
    Object.keys(CATEGORIES).forEach(key => {
      const category = CATEGORIES[key];
      const sortedScores = Object.entries(talentData[category].scores)
        .sort(([, a], [, b]) => b - a)
        .map(([name, score]) => ({ name, score }));
      
      allScores[category] = {
        scores: sortedScores,
        currentPlayer: talentData[category].currentPlayer
      };
    });

    return successResponse(
      res,
      { allScores },
      SUCCESS_MESSAGES.SCORES_RETRIEVED,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(res, ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Submit a vote for a category
 * POST /api/talent/:category/vote
 */
export const submitTalentVote = (req, res) => {
  try {
    const { category } = req.params;
    const { playerNumber, voterName, votes } = req.body;

    if (!talentData[category]) {
      return errorResponse(res, 'Invalid category', HTTP_STATUS.BAD_REQUEST);
    }

    // Validation
    if (!playerNumber || !voterName || !votes || !Array.isArray(votes)) {
      return errorResponse(res, ERROR_MESSAGES.INVALID_VOTE_DATA, HTTP_STATUS.BAD_REQUEST);
    }

    const categoryData = talentData[category];

    // Check if this voter name has already voted
    const existingVote = Object.values(categoryData.playerVotes).find(
      vote => vote.voterName && vote.voterName.toLowerCase() === voterName.toLowerCase()
    );
    
    if (existingVote) {
      return errorResponse(res, `${voterName} has already voted in this category`, HTTP_STATUS.BAD_REQUEST);
    }

    if (votes.length !== Object.keys(categoryData.participantData).length) {
      return errorResponse(res, 'Invalid number of votes', HTTP_STATUS.BAD_REQUEST);
    }

    // Store the vote with voter name
    categoryData.playerVotes[playerNumber] = {
      voterName: voterName,
      votes: votes
    };

    // Update scores
    Object.keys(categoryData.participantData).forEach((name, index) => {
      const key = `${name} - ${categoryData.participantData[name]}`;
      categoryData.scores[key] = (categoryData.scores[key] || 0) + votes[index];
    });

    // Increment current player
    categoryData.currentPlayer += 1;

    // Save data
    saveTalentData(talentData);

    return successResponse(
      res,
      { 
        message: `Vote submitted successfully for ${voterName}`,
        currentPlayer: categoryData.currentPlayer
      },
      SUCCESS_MESSAGES.VOTE_SUBMITTED,
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    return errorResponse(res, ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Get all votes for a category
 * GET /api/talent/:category/votes
 */
export const getAllTalentVotes = (req, res) => {
  try {
    const { category } = req.params;
    
    if (!talentData[category]) {
      return errorResponse(res, 'Invalid category', HTTP_STATUS.BAD_REQUEST);
    }

    return successResponse(
      res,
      { 
        votes: talentData[category].playerVotes,
        participants: talentData[category].participantData,
        category
      },
      'All votes retrieved successfully',
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(res, ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Submit a new performer
 * POST /api/talent/:category/submit-performer
 */
export const submitPerformer = (req, res) => {
  try {
    const { category } = req.params;
    const { name, performanceName } = req.body;

    if (!talentData[category]) {
      return errorResponse(res, 'Invalid category', HTTP_STATUS.BAD_REQUEST);
    }

    if (!name || !performanceName) {
      return errorResponse(res, 'Name and performance name are required', HTTP_STATUS.BAD_REQUEST);
    }

    const categoryData = talentData[category];

    // Add participant
    categoryData.participantData[name] = performanceName;

    // Initialize score
    const key = `${name} - ${performanceName}`;
    categoryData.scores[key] = 0;

    // Save data
    saveTalentData(talentData);

    return successResponse(
      res,
      { name, performanceName, category },
      'Performer submitted successfully',
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    return errorResponse(res, ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Reset data for a category
 * POST /api/talent/:category/reset
 */
export const resetTalentData = (req, res) => {
  try {
    const { category } = req.params;
    
    if (!talentData[category]) {
      return errorResponse(res, 'Invalid category', HTTP_STATUS.BAD_REQUEST);
    }

    // Reset to initial state
    talentData[category] = {
      participantData: {},
      scores: {},
      playerVotes: {},
      currentPlayer: 1
    };

    saveTalentData(talentData);

    return successResponse(
      res,
      { category },
      'Data reset successfully',
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(res, ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};
