/**
 * Main App Component
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import { VotingPage, ScoresPage, AllVotesPage } from './pages';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<VotingPage />} />
            <Route path="/scores" element={<ScoresPage />} />
            <Route path="/votes" element={<AllVotesPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
