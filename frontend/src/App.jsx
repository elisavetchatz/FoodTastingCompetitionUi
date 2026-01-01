/**
 * Main App Component
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import { VotingPage, ScoresPage, AllVotesPage, SubmitFoodPage, TalentVotingPage, TalentScoresPage, SubmitTalentPage } from './pages';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<VotingPage />} />
            <Route path="/submit" element={<SubmitFoodPage />} />
            <Route path="/scores" element={<ScoresPage />} />
            <Route path="/votes" element={<AllVotesPage />} />
            <Route path="/talent-vote" element={<TalentVotingPage />} />
            <Route path="/talent-scores" element={<TalentScoresPage />} />
            <Route path="/submit-talent" element={<SubmitTalentPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
