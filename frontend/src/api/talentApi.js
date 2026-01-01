/**
 * Talent API client
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
 * Get all participants for a category
 */
export const getTalentParticipants = async (category) => {
  return await apiClient.get(`/talent/${category}/participants`);
};

/**
 * Get scores for a category
 */
export const getTalentScores = async (category) => {
  return await apiClient.get(`/talent/${category}/scores`);
};

/**
 * Get all scores for all categories
 */
export const getAllTalentScores = async () => {
  return await apiClient.get('/talent/all-scores');
};

/**
 * Submit a vote for a category
 */
export const submitTalentVote = async (category, playerNumber, voterName, votes) => {
  return await apiClient.post(`/talent/${category}/vote`, { playerNumber, voterName, votes });
};

/**
 * Get all votes for a category
 */
export const getAllTalentVotes = async (category) => {
  return await apiClient.get(`/talent/${category}/votes`);
};

/**
 * Submit a new performer for a category
 */
export const submitPerformer = async (category, name, performanceName) => {
  return await apiClient.post(`/talent/${category}/submit-performer`, { name, performanceName });
};

/**
 * Reset data for a category
 */
export const resetTalentData = async (category) => {
  return await apiClient.post(`/talent/${category}/reset`);
};

export default {
  getTalentParticipants,
  getTalentScores,
  getAllTalentScores,
  submitTalentVote,
  getAllTalentVotes,
  submitPerformer,
  resetTalentData
};
