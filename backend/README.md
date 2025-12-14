# Food Tasting Competition - Backend API

> A RESTful API for managing food tasting competition voting

## 🚀 Quick Start

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation

```bash
# Install dependencies
npm install

# Create .env file from example
copy .env.example .env

# Start development server
npm run dev

# Start production server
npm start
```

## 📚 API Endpoints

### Health Check
- **GET** `/api/health` - Check API status

### Participants
- **GET** `/api/participants` - Get all participants and their dishes

### Scores
- **GET** `/api/scores` - Get current leaderboard scores

### Voting
- **POST** `/api/vote` - Submit a vote
  ```json
  {
    "playerNumber": 1,
    "votes": [10, 8, 9, ...]
  }
  ```

### Votes
- **GET** `/api/votes` - Get all submitted votes

### Reset
- **POST** `/api/reset` - Reset all data (for testing)

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Security**: Helmet.js, CORS, Rate Limiting
- **Data Storage**: In-memory (can be extended with MongoDB)

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   ├── app.js          # Express app setup
│   └── server.js       # Server entry point
├── .env.example        # Environment variables example
├── .gitignore
├── package.json
└── README.md
```

## 🌐 Environment Variables

```env
PORT=3000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3001
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 📝 License

MIT
