/**
 * Application constants
 */

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

export const SUCCESS_MESSAGES = {
  VOTE_SUBMITTED: 'Vote submitted successfully',
  SCORES_RETRIEVED: 'Scores retrieved successfully',
  PARTICIPANTS_RETRIEVED: 'Participants retrieved successfully',
  VOTES_RETRIEVED: 'Votes retrieved successfully',
  DATA_RESET: 'Data reset successfully'
};

export const ERROR_MESSAGES = {
  VOTE_ALREADY_SUBMITTED: 'This player has already voted',
  INVALID_VOTE_DATA: 'Invalid vote data',
  SERVER_ERROR: 'Internal server error'
};

export default {
  HTTP_STATUS,
  SUCCESS_MESSAGES,
  ERROR_MESSAGES
};
