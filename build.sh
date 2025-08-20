#!/bin/bash

# Exit on any error
set -e

echo "Starting build process..."

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Install Node.js dependencies and build frontend
echo "Installing Node.js dependencies..."
cd frontend
npm ci --only=production

echo "Building React frontend..."
npm run build

# Move back to root directory
cd ..

echo "Build completed successfully!"
