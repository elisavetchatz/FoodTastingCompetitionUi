/**
 * SubmitFoodPage Component
 * Allows users to submit new food items for voting
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from '../components';
import { submitFood } from '../api/votingApi';
import './SubmitFoodPage.css';

const SubmitFoodPage = () => {
  const navigate = useNavigate();
  const [participantName, setParticipantName] = useState('');
  const [dishName, setDishName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!participantName.trim() || !dishName.trim()) {
      setError('Please fill in both fields');
      return;
    }

    setLoading(true);

    try {
      await submitFood(participantName.trim(), dishName.trim());
      setSuccess('Food submitted successfully! It will now appear in the voting list.');
      setParticipantName('');
      setDishName('');
      
      // Navigate to voting page after 2 seconds
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Failed to submit food. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-food-page">
      <div className="submit-container">
        <Card className="submit-card">
          <div className="submit-header">
            <h2>Submit Your Dish</h2>
            <p className="subtitle">Add your food to the tasting competition</p>
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

          <form onSubmit={handleSubmit} className="submit-form">
            <div className="form-group">
              <label htmlFor="participantName">Your Name</label>
              <input
                type="text"
                id="participantName"
                className="form-input"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="Enter your name"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dishName">Dish Name</label>
              <input
                type="text"
                id="dishName"
                className="form-input"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                placeholder="Enter your dish name"
                disabled={loading}
              />
            </div>

            <div className="form-actions">
              <Button
                type="submit"
                variant="primary"
                disabled={loading}
                fullWidth
              >
                {loading ? 'Submitting...' : 'Submit Food'}
              </Button>
            </div>
          </form>
        </Card>

        <Card className="info-card">
          <h3>Guidelines</h3>
          <ul className="guidelines">
            <li>Make sure your name is spelled correctly</li>
            <li>Give your dish a creative name</li>
            <li>Once submitted, your dish will appear in the voting list</li>
            <li>Others can then vote on your creation</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default SubmitFoodPage;
