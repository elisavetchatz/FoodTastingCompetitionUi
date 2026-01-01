/**
 * TalentScoresPage Component
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components';
import { getAllTalentScores } from '../api/talentApi';
import './TalentScoresPage.css';

const CATEGORIES = {
  athleticPerformance: {
    name: 'Athletic Performance',
    icon: '🏃'
  },
  danceMusicalPerformance: {
    name: 'Dance & Musical Performance',
    icon: '🎭'
  },
  theatricalPerformance: {
    name: 'Theatrical Performance',
    icon: '🎬'
  }
};

const TalentScoresPage = () => {
  const navigate = useNavigate();
  const [allScores, setAllScores] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllScores();
  }, []);

  const fetchAllScores = async () => {
    try {
      const response = await getAllTalentScores();
      setAllScores(response.data.allScores);
      setLoading(false);
    } catch (err) {
      setError('Failed to load scores');
      setLoading(false);
    }
  };

  const getMedalEmoji = (position) => {
    switch (position) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="talent-scores-page">
        <div className="loading">Loading scores...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="talent-scores-page">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="talent-scores-page">
      <div className="page-header">
        <h1>🏆 Talent Competition Leaderboard 🏆</h1>
        <p>See the scores for all categories</p>
      </div>

      <div className="categories-scores">
        {Object.entries(CATEGORIES).map(([categoryKey, category]) => {
          const categoryData = allScores[categoryKey];
          const hasScores = categoryData?.scores && categoryData.scores.length > 0;

          return (
            <Card key={categoryKey} className="category-scores-card">
              <div className="category-header">
                <h2>
                  <span className="category-icon">{category.icon}</span>
                  {category.name}
                </h2>
                {categoryData && (
                  <span className="player-count">
                    Player {categoryData.currentPlayer} / 20
                  </span>
                )}
              </div>

              {!hasScores ? (
                <div className="no-scores">
                  <p>No votes yet in this category</p>
                  <Button 
                    onClick={() => navigate('/talent-vote')}
                    size="small"
                  >
                    Be the first to vote!
                  </Button>
                </div>
              ) : (
                <div className="scores-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Performer</th>
                        <th>Performance</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categoryData.scores.map((entry, index) => {
                        const [name, performance] = entry.name.split(' - ');
                        return (
                          <tr key={entry.name} className={index < 3 ? 'top-three' : ''}>
                            <td className="rank">
                              {getMedalEmoji(index)}
                              {index + 1}
                            </td>
                            <td className="performer-name">{name}</td>
                            <td className="performance-name">{performance}</td>
                            <td className="score">{entry.score}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div className="navigation-buttons">
        <Button onClick={() => navigate('/talent-vote')} variant="primary">
          Vote Now
        </Button>
        <Button onClick={() => fetchAllScores()} variant="secondary">
          Refresh Scores
        </Button>
      </div>
    </div>
  );
};

export default TalentScoresPage;
