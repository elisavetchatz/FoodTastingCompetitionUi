/**
 * Voting Controller
 * Handles HTTP requests for voting operations
 */

import { successResponse, errorResponse } from '../utils/responses.js';
import { SUCCESS_MESSAGES, ERROR_MESSAGES, HTTP_STATUS } from '../config/constants.js';
import { loadData, saveData } from '../utils/storage.js';

// Load data from file on startup
const initialData = loadData();
let participantData = initialData.participantData;
let scores = initialData.scores;
let playerVotes = initialData.playerVotes;
let currentPlayer = initialData.currentPlayer;
const maxPlayers = 20;

// Initialize scores if empty
if (Object.keys(scores).length === 0) {
  Object.keys(participantData).forEach(name => {
    const key = `${name} - ${participantData[name]}`;
    scores[key] = 0;
  });
  saveData({ participantData, scores, playerVotes, currentPlayer });
}

/**
 * Get all participants
 * GET /api/participants
 */
export const getParticipants = (req, res) => {
  try {
    return successResponse(
      res,
      { participants: participantData, maxPlayers },
      SUCCESS_MESSAGES.PARTICIPANTS_RETRIEVED,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(res, ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Get current scores
 * GET /api/scores
 */
export const getScores = (req, res) => {
  try {
    const sortedScores = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([name, score]) => ({ name, score }));

    return successResponse(
      res,
      { scores: sortedScores, currentPlayer },
      SUCCESS_MESSAGES.SCORES_RETRIEVED,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(res, ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Submit a vote
 * POST /api/vote
 */
export const submitVote = (req, res) => {
  try {
    const { playerNumber, votes } = req.body;

    // Validation
    if (!playerNumber || !votes || !Array.isArray(votes)) {
      return errorResponse(res, ERROR_MESSAGES.INVALID_VOTE_DATA, HTTP_STATUS.BAD_REQUEST);
    }

    if (playerVotes[playerNumber]) {
      return errorResponse(res, ERROR_MESSAGES.VOTE_ALREADY_SUBMITTED, HTTP_STATUS.BAD_REQUEST);
    }

    if (votes.length !== Object.keys(participantData).length) {
      return errorResponse(res, 'Invalid number of votes', HTTP_STATUS.BAD_REQUEST);
    }

    // Store the vote
    playerVotes[playerNumber] = votes;

    // Update scores
    Object.keys(participantData).forEach((name, index) => {
      const key = `${name} - ${participantData[name]}`;
      scores[key] += votes[index];
    });

    // Update current player
    if (playerNumber === currentPlayer) {
      currentPlayer++;
    }

    // Save data to file
    saveData({ participantData, scores, playerVotes, currentPlayer });

    return successResponse(
      res,
      { playerNumber, votesRemaining: maxPlayers - Object.keys(playerVotes).length },
      SUCCESS_MESSAGES.VOTE_SUBMITTED,
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    return errorResponse(res, ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Get all votes
 * GET /api/votes
 */
export const getAllVotes = (req, res) => {
  try {
    return successResponse(
      res,
      { votes: playerVotes },
      SUCCESS_MESSAGES.VOTES_RETRIEVED,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(res, ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Submit a new food item
 * POST /api/submit-food
 */
export const submitFood = (req, res) => {
  try {
    const { participantName, dishName } = req.body;

    // Validation
    if (!participantName || !dishName) {
      return errorResponse(res, 'Participant name and dish name are required', HTTP_STATUS.BAD_REQUEST);
    }

    // Check if participant already exists
    if (participantData[participantName]) {
      return errorResponse(res, 'This participant name already exists. Please use a different name.', HTTP_STATUS.BAD_REQUEST);
    }

    // Add new participant
    participantData[participantName] = dishName;

    // Initialize score for new participant
    // Save data to file
    saveData({ participantData, scores, playerVotes, currentPlayer });

    const key = `${participantName} - ${dishName}`;
    scores[key] = 0;

    return successResponse(
      res,
      { participantName, dishName },
      'Food submitted successfully',
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    return errorResponse(res, ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

/**
 * Reset all data (for testing)
 * POST /api/reset
 */
export const resetData = (req, res) => {
  try {
    scores = {};
    playerVotes = {};
    currentPlayer = 1;
// Save data to file
    saveData({ participantData, scores, playerVotes, currentPlayer });

    
    Object.keys(participantData).forEach(name => {
      const key = `${name} - ${participantData[name]}`;
      scores[key] = 0;
    });

    return successResponse(
      res,
      null,
      SUCCESS_MESSAGES.DATA_RESET,
      HTTP_STATUS.OK
    );
  } catch (error) {
    return errorResponse(res, ERROR_MESSAGES.SERVER_ERROR, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
};

export default {
  getParticipants,
  getScores,
  submitVote,
  getAllVotes,
  submitFood,
  resetData
};
