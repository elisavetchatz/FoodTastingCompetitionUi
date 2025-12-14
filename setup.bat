@echo off
echo.
echo ╔═══════════════════════════════════════════════════╗
echo ║                                                   ║
echo ║   🍽️  Food Tasting Competition Setup            ║
echo ║                                                   ║
echo ╚═══════════════════════════════════════════════════╝
echo.

echo 📦 Setting up Backend...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Backend setup failed!
    pause
    exit /b 1
)
echo ✅ Backend setup complete!
echo.

echo 📦 Setting up Frontend...
cd ..\frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Frontend setup failed!
    pause
    exit /b 1
)
echo ✅ Frontend setup complete!
echo.

cd ..
echo.
echo ╔═══════════════════════════════════════════════════╗
echo ║                                                   ║
echo ║   ✅ Setup Complete!                             ║
echo ║                                                   ║
echo ╚═══════════════════════════════════════════════════╝
echo.
echo To start the application:
echo.
echo 1. Open a terminal and run: cd backend ^&^& npm run dev
echo 2. Open another terminal and run: cd frontend ^&^& npm run dev
echo.
echo Or use the start.bat script for convenience!
echo.
pause
