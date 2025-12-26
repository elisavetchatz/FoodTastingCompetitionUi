/**
 * API client configuration
 */

import axios from 'axios';

// In production, API is on same domain. In development, use localhost:3000
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.MODE === 'production' ? '/api' : 'http://localhost:3000/api');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Get all participants
 */
export const getParticipants = async () => {
  return await apiClient.get('/participants');
};

/**
 * Get current scores
 */
export const getScores = async () => {
  return await apiClient.get('/scores');
};

/**
 * Submit a vote
 */
export const submitVote = async (playerNumber, voterName, votes) => {
  return await apiClient.post('/vote', { playerNumber, voterName, votes });
};

/**
 * Get all votes
 */
export const getAllVotes = async () => {
  return await apiClient.get('/votes');
};

/**
 * Submit a new food item
 */
export const submitFood = async (participantName, dishName) => {
  return await apiClient.post('/submit-food', { participantName, dishName });
};

/**
 * Reset all data
 */
export const resetData = async () => {
  return await apiClient.post('/reset');
};

export default {
  getParticipants,
  getScores,
  submitVote,
  getAllVotes,
  submitFood,
  resetData
};
