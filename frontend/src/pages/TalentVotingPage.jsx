/**
 * TalentVotingPage Component
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components';
import { getTalentParticipants, submitTalentVote } from '../api/talentApi';
import './TalentVotingPage.css';

const CATEGORIES = {
  athleticPerformance: {
    name: 'Athletic Performance',
    icon: '🏃',
    description: 'Vote for the best athletic performance'
  },
  danceMusicalPerformance: {
    name: 'Dance & Musical Performance',
    icon: '🎭',
    description: 'Vote for the best dance and musical performance'
  },
  theatricalPerformance: {
    name: 'Theatrical Performance',
    icon: '🎬',
    description: 'Vote for the best theatrical performance'
  }
};

const TalentVotingPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [participants, setParticipants] = useState({});
  const [maxPlayers, setMaxPlayers] = useState(20);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [voterName, setVoterName] = useState('');
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (selectedCategory) {
      fetchParticipants(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchParticipants = async (category) => {
    try {
      setLoading(true);
      const response = await getTalentParticipants(category);
      setParticipants(response.data.participants);
      setMaxPlayers(response.data.maxPlayers);
      setVotes(new Array(Object.keys(response.data.participants).length).fill(''));
      setLoading(false);
    } catch (err) {
      setError('Failed to load participants');
      setLoading(false);
    }
  };

  const handleVoteChange = (index, value) => {
    const newVotes = [...votes];
    newVotes[index] = value;
    setVotes(newVotes);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate voter name
    if (!voterName.trim()) {
      setError('Please enter your name');
      return;
    }

    // Validate all fields are filled
    const numericVotes = votes.map(v => parseInt(v));
    if (numericVotes.some(v => isNaN(v) || v === '')) {
      setError('Please provide a score for every performer');
      return;
    }

    try {
      await submitTalentVote(selectedCategory, currentPlayer, voterName.trim(), numericVotes);
      alert(`Vote submitted for ${voterName} in ${CATEGORIES[selectedCategory].name}!`);
      setCurrentPlayer(prev => prev + 1);
      setVoterName('');
      setVotes(new Array(Object.keys(participants).length).fill(''));

      if (currentPlayer >= maxPlayers) {
        alert('All votes collected! Check the leaderboard.');
        navigate('/talent-scores');
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to submit vote');
      }
    }
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setVoterName('');
    setVotes([]);
    setError('');
  };

  if (!selectedCategory) {
    return (
      <div className="talent-voting-page">
        <div className="page-header">
          <h1>🌟 Talent Competition 🌟</h1>
          <p>Select a category to vote</p>
        </div>

        <div className="categories-grid">
          {Object.entries(CATEGORIES).map(([key, category]) => (
            <Card key={key} className="category-card">
              <div className="category-icon">{category.icon}</div>
              <h2>{category.name}</h2>
              <p>{category.description}</p>
              <Button onClick={() => setSelectedCategory(key)}>
                Vote Now
              </Button>
            </Card>
          ))}
        </div>

        <div className="navigation-buttons">
          <Button onClick={() => navigate('/talent-scores')} variant="secondary">
            View Leaderboard
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="talent-voting-page">
        <div className="loading">Loading participants...</div>
      </div>
    );
  }

  const participantsList = Object.entries(participants);

  return (
    <div className="talent-voting-page">
      <div className="page-header">
        <h1>{CATEGORIES[selectedCategory].icon} {CATEGORIES[selectedCategory].name}</h1>
        <p>Player {currentPlayer} of {maxPlayers}</p>
        <Button onClick={handleBackToCategories} variant="secondary" size="small">
          ← Back to Categories
        </Button>
      </div>

      {participantsList.length === 0 ? (
        <Card>
          <div className="no-participants">
            <p>No participants yet in this category.</p>
            <p>Be the first to submit a performer!</p>
          </div>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="voting-form">
          <Card>
            <div className="voter-info">
              <label htmlFor="voterName">Your Name:</label>
              <input
                type="text"
                id="voterName"
                value={voterName}
                onChange={(e) => setVoterName(e.target.value)}
                placeholder="Enter your name"
                required
              />
            </div>
          </Card>

          <div className="participants-list">
            {participantsList.map(([name, performance], index) => (
              <Card key={name} className="participant-card">
                <div className="participant-info">
                  <h3 className="performance-name">{performance}</h3>
                  <p className="participant-name">{name}</p>
                </div>
                <div className="vote-input">
                  <label htmlFor={`vote-${index}`}>Score (0-10):</label>
                  <input
                    type="number"
                    id={`vote-${index}`}
                    min="0"
                    max="10"
                    value={votes[index]}
                    onChange={(e) => handleVoteChange(index, e.target.value)}
                    placeholder="0-10"
                    required
                  />
                </div>
              </Card>
            ))}
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-actions">
            <Button type="submit" size="large">
              Submit Vote
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TalentVotingPage;
