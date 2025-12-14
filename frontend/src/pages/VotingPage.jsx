/**
 * VotingPage Component
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components';
import { getParticipants, submitVote } from '../api/votingApi';
import './VotingPage.css';

const VotingPage = () => {
  const navigate = useNavigate();
  const [participants, setParticipants] = useState({});
  const [maxPlayers, setMaxPlayers] = useState(20);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [votes, setVotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      const response = await getParticipants();
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

    // Validate all fields are filled
    const numericVotes = votes.map(v => parseInt(v));
    if (numericVotes.some(v => isNaN(v) || v === '')) {
      setError('Please provide a score for every dish');
      return;
    }

    try {
      await submitVote(currentPlayer, numericVotes);
      alert(`Vote submitted for Player ${currentPlayer}!`);
      setCurrentPlayer(prev => prev + 1);
      setVotes(new Array(Object.keys(participants).length).fill(''));

      if (currentPlayer >= maxPlayers) {
        alert('All votes collected! Check the leaderboard.');
        navigate('/scores');
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to submit vote');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="voting-page">
      <div className="voting-container">
        <Card className="voting-card">
          <div className="player-header">
            <h2>Player {currentPlayer}</h2>
            <span className="players-remaining">
              {maxPlayers - currentPlayer + 1} players remaining
            </span>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="voting-form">
            <div className="dishes-list">
              {Object.entries(participants).map(([name, dish], index) => (
                <div key={index} className="dish-item">
                  <label className="dish-label">
                    <span className="participant-name">{name}</span>
                    <span className="dish-name">{dish}</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={votes[index]}
                    onChange={(e) => handleVoteChange(index, e.target.value)}
                    className="score-input"
                    placeholder="0-10"
                    required
                  />
                </div>
              ))}
            </div>

            <Button type="submit" variant="primary" fullWidth>
              Submit Vote
            </Button>
          </form>
        </Card>

        <Card className="info-card">
          <h3>How to Vote</h3>
          <ul className="instructions">
            <li>Rate each dish from 0 to 10</li>
            <li>Higher scores = Better taste!</li>
            <li>Submit when all dishes are rated</li>
            <li>Check the leaderboard after voting</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default VotingPage;
