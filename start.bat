@echo off
echo.
echo ╔═══════════════════════════════════════════════════╗
echo ║                                                   ║
echo ║   🍽️  Starting Food Tasting Competition         ║
echo ║                                                   ║
echo ╚═══════════════════════════════════════════════════╝
echo.

echo Starting Backend Server...
start "Backend API" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak >nul

echo Starting Frontend Development Server...
start "Frontend UI" cmd /k "cd frontend && npm run dev"

echo.
echo ✅ Both servers are starting!
echo.
echo Backend: http://localhost:3000
echo Frontend: http://localhost:5173
echo.
echo Close the terminal windows to stop the servers.
echo.
