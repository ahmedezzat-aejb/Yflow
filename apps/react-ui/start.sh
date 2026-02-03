#!/bin/bash

# Yflow Cyber Dashboard Startup Script
echo "🚀 Starting Yflow Cyber Dashboard..."
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the development server
echo "🌐 Starting development server..."
echo "📍 Dashboard will be available at: http://localhost:4200"
echo "🎨 Cyberpunk UI with multi-language support"
echo "🌍 Languages: EN, AR, RU, ZH"
echo "📱 Fully responsive design"
echo ""
echo "Press Ctrl+C to stop the server"
echo "=================================="

npm run start
