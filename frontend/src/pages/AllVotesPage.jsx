/**
 * AllVotesPage Component
 */

import React, { useState, useEffect } from 'react';
import { Button, Card } from '../components';
import { getAllVotes } from '../api/votingApi';
import './AllVotesPage.css';

const AllVotesPage = () => {
  const [votes, setVotes] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVotes();
  }, []);

  const fetchVotes = async () => {
    try {
      const response = await getAllVotes();
      setVotes(response.data.votes);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load votes', err);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading votes...</div>;
  }

  return (
    <div className="votes-page">
      <div className="votes-container">
        <Card className="votes-card">
          <div className="votes-header">
            <h2>All Submitted Votes</h2>
            <Button onClick={fetchVotes} variant="secondary">
              Refresh
            </Button>
          </div>

          {Object.keys(votes).length === 0 ? (
            <div className="no-votes">
              <p>No votes have been submitted yet!</p>
            </div>
          ) : (
            <div className="votes-list">
              {Object.entries(votes).map(([player, voteData]) => {
                // Handle both old format (array) and new format (object with voterName)
                const voterName = voteData.voterName || `Player ${player}`;
                const votesArray = voteData.votes || voteData;
                
                return (
                  <div key={player} className="vote-item">
                    <h3 className="player-title">{voterName}</h3>
                    <div className="vote-scores">
                      {votesArray.map((score, index) => (
                        <span key={index} className="vote-score">
                          {score}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AllVotesPage;
