# 🚀 Quick Start Guide

## First Time Setup

### Step 1: Install Dependencies

Open a terminal in the project root and run:
```bash
npm run install-all
```

This installs all dependencies for the root, backend, and frontend.

### Step 2: Start the Application

Simply run:
```bash
npm start
```

This will:
- Start the backend server on http://localhost:3000
- Start the frontend dev server on http://localhost:5173
- Run both in a single terminal window

### Step 3: Open Your Browser

Navigate to: **http://localhost:5173**

You should see the Food Tasting Competition voting page!

### Alternative Start Methods

**Option 1 (Recommended):**
```bash
npm start
```

**Option 2 (Using batch file on Windows):**
```bash
start.bat
```

**Option 3 (Separate terminals):**
```bash
# Terminal 1
npm run server

# Terminal 2
npm run client
```

## Testing the Application

### 1. Submit a Vote
- Go to the voting page (home)
- Enter scores (0-10) for each dish
- Click "Submit Vote"
- You'll see "Vote submitted for Player 1!"

### 2. View Leaderboard
- Click "Leaderboard" in the navigation
- See the sorted scores with rankings
- Top 3 dishes get special badges (🥇🥈🥉)
- Toggle "Auto-refresh" for live updates

### 3. View All Votes
- Click "All Votes" in the navigation
- See every vote that was submitted
- Each player's scores are displayed

### 4. Test the API Directly

Open a new terminal and try these commands:

```bash
# Get participants
curl http://localhost:3000/api/participants

# Get current scores
curl http://localhost:3000/api/scores

# Submit a test vote
curl -X POST http://localhost:3000/api/vote ^
  -H "Content-Type: application/json" ^
  -d "{\"playerNumber\": 99, \"votes\": [10,9,8,7,6,5,4,3,2,1,9,8,7,6,5]}"

# Reset data (for testing)
curl -X POST http://localhost:3000/api/reset
```

## Stopping the Application

Press `Ctrl+C` in the terminal to stop both servers.

## Troubleshooting

### Port Already in Use
If you see "Port 3000 is already in use":
1. Close any other applications using port 3000
2. Or change the port in `backend/.env`: `PORT=3001`

If you see "Port 5173 is already in use":
1. Close any other Vite/React apps running
2. Or the system will automatically try the next available port

### Dependencies Not Installing
Make sure you have Node.js v18+ and npm v9+ installed:
```bash
node --version
npm --version
```

If not, download from: https://nodejs.org/

### Frontend Can't Connect to Backend
Check that:
1. Backend is running on port 3000
2. `frontend/.env` has: `VITE_API_BASE_URL=http://localhost:3000/api`
3. No firewall blocking localhost connections

## Common Commands

### Backend
```bash
cd backend
npm run dev    # Start development server
npm start      # Start production server
```

### Frontend
```bash
cd frontend
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

## Next Steps

- Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) for detailed architecture info
- Check [backend/README.md](backend/README.md) for API documentation
- Check [frontend/README.md](frontend/README.md) for frontend details
- Explore the code and customize it for your needs!

## Need Help?

- Check the main [README.md](README.md)
- Look at the console logs in the terminal windows
- Open browser DevTools (F12) to see any frontend errors

## 🎉 Enjoy!

Your modern food tasting competition app is ready to use!
