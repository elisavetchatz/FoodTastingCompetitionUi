/**
 * Voting Controller
 * Handles HTTP requests for voting operations
 */

import { successResponse, errorResponse } from '../utils/responses.js';
import { SUCCESS_MESSAGES, ERROR_MESSAGES, HTTP_STATUS } from '../config/constants.js';

// In-memory data storage (in a real app, this would be a database)
const participantData = {
  "Καλλίτσα": "Μακαρονόπιτα Κ...αλλιώς",
  "Καλλίτσα2": "Φτερουγίσματα με Κασέρια",
  "Μαρία Μικρή": "Σαλάτα της Χοληστερίνης",
  "Μαρία Μικρή2": "Ρολό Κιμά-> Απόπειρα 2",
  "Άρης": "Sevasto...bai",
  "Κοσμάς": "brownies του Κόσμου",
  "Σοφούλα": "Κοτόπουλο Γεμιστό",
  "Χριστίνα Χ.": "Του κολοκυθιού τα εννιάμερα",
  "Σλβάνα": "Σοφρίτο αλά... Σεβαστιώτα",
  "Γιάννης και Δημήτρης": "Μοσχάρι Κρασάτο με Μεθυσμένες Πατάτες",
  "Χριστίνα Β": "Ψαρονεύρι με ρύζι",
  "Μαρία Όμορφη": "Banana CAKE",
  "Μαρία Όμορφη και Σταυρούλα": "Φωλίτσες",
  "Πάολα": "Σνιτσελόνια με Ντιπ",
  "Ελένη": "Μπισκοτίνια με Εσάνς... Μελομακάρονο"
};

let scores = {};
let playerVotes = {};
let currentPlayer = 1;
const maxPlayers = 20;

// Initialize scores
Object.keys(participantData).forEach(name => {
  const key = `${name} - ${participantData[name]}`;
  scores[key] = 0;
});

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
 * Reset all data (for testing)
 * POST /api/reset
 */
export const resetData = (req, res) => {
  try {
    scores = {};
    playerVotes = {};
    currentPlayer = 1;

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
  resetData
};
