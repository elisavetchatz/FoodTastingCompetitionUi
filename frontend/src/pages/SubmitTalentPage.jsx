/**
 * SubmitTalentPage Component
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components';
import { submitPerformer } from '../api/talentApi';
import './SubmitTalentPage.css';

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

const SubmitTalentPage = () => {
  const navigate = useNavigate();
  const [performerName, setPerformerName] = useState('');
  const [performanceName, setPerformanceName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('athleticPerformance');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!performerName.trim() || !performanceName.trim()) {
      setError('Please fill in all fields');
      return;
    }

    try {
      await submitPerformer(selectedCategory, performerName.trim(), performanceName.trim());
      setSuccess(`Successfully submitted: ${performerName} - ${performanceName} to ${CATEGORIES[selectedCategory].name}!`);
      setPerformerName('');
      setPerformanceName('');
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to submit performer. Please try again.');
      }
    }
  };

  return (
    <div className="submit-talent-page">
      <div className="page-header">
        <h1>🌟 Submit Talent Performance 🌟</h1>
        <p>Register your performance for the talent competition</p>
      </div>

      <Card className="submit-form-card">
        <form onSubmit={handleSubmit} className="submit-form">
          <div className="form-group">
            <label htmlFor="performerName">Performer Name:</label>
            <input
              type="text"
              id="performerName"
              value={performerName}
              onChange={(e) => setPerformerName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="performanceName">Performance Name/Description:</label>
            <input
              type="text"
              id="performanceName"
              value={performanceName}
              onChange={(e) => setPerformanceName(e.target.value)}
              placeholder="E.g., '100m Sprint' or 'Piano Solo'"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              {Object.entries(CATEGORIES).map(([key, category]) => (
                <option key={key} value={key}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {success && (
            <div className="success-message">
              {success}
            </div>
          )}

          <div className="form-actions">
            <Button type="submit" size="large">
              Submit Performance
            </Button>
            <Button 
              type="button" 
              variant="secondary" 
              onClick={() => navigate('/talent-vote')}
            >
              Back to Voting
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default SubmitTalentPage;
