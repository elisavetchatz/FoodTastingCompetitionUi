/**
 * ScoresPage Component
 */

import React, { useState, useEffect } from 'react';
import { Button, Card } from '../components';
import { getScores } from '../api/votingApi';
import './ScoresPage.css';

const ScoresPage = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    fetchScores();
  }, []);

  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchScores, 3000);
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const fetchScores = async () => {
    try {
      const response = await getScores();
      setScores(response.data.scores);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load scores', err);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading scores...</div>;
  }

  return (
    <div className="scores-page">
      <div className="scores-container">
        <Card className="scores-card">
          <div className="scores-header">
            <h2>🏆 Leaderboard</h2>
            <div className="header-actions">
              <Button onClick={fetchScores} variant="secondary">
                Refresh
              </Button>
              <label className="auto-refresh">
                <input
                  type="checkbox"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                />
                Auto-refresh
              </label>
            </div>
          </div>

          <div className="scores-list">
            {scores.map((item, index) => (
              <div key={index} className={`score-item rank-${index + 1}`}>
                <div className="rank-badge">
                  {index === 0 && '🥇'}
                  {index === 1 && '🥈'}
                  {index === 2 && '🥉'}
                  {index > 2 && `#${index + 1}`}
                </div>
                <div className="participant-info">
                  <span className="participant-name">{item.name}</span>
                </div>
                <div className="score-value">{item.score} pts</div>
              </div>
            ))}
          </div>

          {scores.length === 0 && (
            <div className="no-scores">
              <p>No votes submitted yet!</p>
              <p>Be the first to vote!</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ScoresPage;
