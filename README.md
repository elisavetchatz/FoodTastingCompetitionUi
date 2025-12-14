# 🍽️ Food Tasting Competition - Full Stack Application

> A modern web application for managing food tasting competitions with voting and real-time leaderboards

This is a complete rewrite of the original Python tkinter application, now featuring a Node.js/Express backend with a REST API and a React frontend with a modern UI.

## 🎯 Project Overview

This application allows multiple participants to vote on dishes in a food tasting competition. It features:

- **Backend API**: RESTful API built with Node.js and Express
- **Frontend UI**: Modern React application with responsive design
- **Real-time Updates**: Live leaderboard with auto-refresh capability
- **Clean Architecture**: Separated concerns following best practices from XploreBackend and XploreFrontend

## 🏗️ Architecture

```
FoodTastingCompetitionUi/
├── backend/               # Node.js/Express REST API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── routes/       # API endpoints
│   │   ├── middleware/   # Custom middleware
│   │   ├── config/       # Configuration files
│   │   └── utils/        # Utility functions
│   └── package.json
│
├── frontend/             # React Application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── api/         # API client
│   │   └── App.jsx
│   └── package.json
│
├── voting_app.py        # Original Python application (legacy)
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation & Running

#### Easiest Way (Recommended)

```bash
# Install all dependencies (root, backend, and frontend)
npm run install-all

# Start the application (both backend and frontend)
npm start
```

That's it! The app will open:
- Backend API: http://localhost:3000
- Frontend UI: http://localhost:5173

#### Alternative: Individual Commands

**Install dependencies:**
```bash
npm install          # Install root dependencies
cd backend && npm install
cd ../frontend && npm install
```

**Start development:**
```bash
npm run dev          # Runs both backend and frontend
# OR run them separately:
npm run server       # Backend only
npm run client       # Frontend only
```

## 📚 API Endpoints

### Backend REST API

- **GET** `/api/health` - Health check
- **GET** `/api/participants` - Get all participants and dishes
- **GET** `/api/scores` - Get current leaderboard
- **POST** `/api/vote` - Submit a vote
- **GET** `/api/votes` - Get all submitted votes
- **POST** `/api/reset` - Reset all data (for testing)

### Example API Usage

```bash
# Get participants
curl http://localhost:3000/api/participants

# Submit a vote
curl -X POST http://localhost:3000/api/vote \
  -H "Content-Type: application/json" \
  -d '{"playerNumber": 1, "votes": [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 9, 8, 7, 6, 5]}'

# Get leaderboard
curl http://localhost:3000/api/scores
```

## 🎨 Features

### Backend
- ✅ RESTful API with Express.js
- ✅ CORS configuration for cross-origin requests
- ✅ Request validation and error handling
- ✅ Rate limiting for API protection
- ✅ Centralized logging middleware
- ✅ In-memory data storage (can be extended with MongoDB)

### Frontend
- ✅ Modern React with functional components and hooks
- ✅ React Router for navigation
- ✅ Responsive design for all screen sizes
- ✅ Real-time score updates with auto-refresh
- ✅ Clean and intuitive UI
- ✅ Form validation
- ✅ Error handling and user feedback

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Security**: Helmet.js, CORS, Rate Limiting
- **Architecture**: MVC pattern with controllers and routes

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router 6
- **HTTP Client**: Axios
- **Styling**: CSS3 with modern gradients and animations

## 📖 Comparison with Original App

| Feature | Original (Python/tkinter) | New (Node.js/React) |
|---------|---------------------------|---------------------|
| Architecture | Monolithic desktop app | Separated backend/frontend |
| UI | Desktop GUI (tkinter) | Modern web UI |
| Data Storage | Text file (votes.txt) | In-memory (extensible) |
| Multi-user | Single device | Web-based, multiple devices |
| Updates | Manual refresh | Real-time with auto-refresh |
| Platform | Desktop only | Any device with browser |

## 🚀 Deployment to Render

This project is configured for easy deployment to [Render](https://render.com):

### Automatic Deployment

1. Push your code to GitHub
2. Connect your GitHub repo to Render
3. Render will automatically detect `render.yaml`
4. Your app will be deployed!

### Manual Deployment

1. Create a new Web Service on Render
2. Connect your repository
3. Set build command: `npm run render-build`
4. Set start command: `npm run render-start`
5. Add environment variables:
   - `NODE_ENV=production`
   - `ALLOWED_ORIGINS=https://your-app.onrender.com`

The backend will serve the built frontend files automatically in production.

## 🎯 Future Improvements

- [ ] Add MongoDB database for persistent storage
- [ ] Add user authentication
- [ ] Add WebSocket support for real-time updates
- [ ] Add vote editing/deletion functionality
- [ ] Add admin dashboard
- [ ] Add vote statistics and analytics
- [ ] Add export to CSV/Excel
- [ ] Add Docker containerization
- [ ] Add unit and integration tests

## 🌟 Inspired By

This project was inspired by and follows architectural patterns from:
- [XploreFrontend](https://github.com/mileoudi/XploreFrontend) - React frontend architecture
- [XploreBackend](https://github.com/mileoudi/XploreBackend) - Node.js/Express backend structure



---

## 📝 License

MIT

## 👤 Author

Developed with ❤️ for the family Christmas gathering!

**Happy Voting! 🎉**

