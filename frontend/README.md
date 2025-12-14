# Food Tasting Competition - Frontend

> React frontend for the food tasting competition voting application

## 🚀 Quick Start

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Configuration

The app connects to the backend API. By default, it uses `http://localhost:3000/api`.

To change this, create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 📁 Project Structure

```
frontend/
├── public/             # Static assets
├── src/
│   ├── api/           # API client
│   ├── components/    # Reusable components
│   ├── pages/         # Page components
│   ├── App.jsx        # Main app component
│   ├── App.css        # Global styles
│   └── main.jsx       # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## 🎨 Features

- **Modern UI**: Clean and responsive design
- **Real-time Updates**: Auto-refresh option for leaderboard
- **Easy Voting**: Intuitive interface for submitting votes
- **Leaderboard**: Live score tracking with rankings
- **Vote History**: View all submitted votes

## 🛠 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router 6
- **HTTP Client**: Axios
- **Styling**: CSS3

## 📝 License

MIT
