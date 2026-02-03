@echo off
title Yflow Cyber Dashboard

echo 🚀 Starting Yflow Cyber Dashboard...
echo ==================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

REM Start the development server
echo 🌐 Starting development server...
echo 📍 Dashboard will be available at: http://localhost:4200
echo 🎨 Cyberpunk UI with multi-language support
echo 🌍 Languages: EN, AR, RU, ZH
echo 📱 Fully responsive design
echo.
echo Press Ctrl+C to stop the server
echo ==================================

npm run start
