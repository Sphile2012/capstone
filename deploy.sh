#!/bin/bash

echo "====================================="
echo "Heroku Deployment Script"
echo "====================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
fi

# Check if Heroku CLI is installed
if ! command -v heroku &> /dev/null; then
    echo "Error: Heroku CLI is not installed"
    echo "Please install it from: https://devcenter.heroku.com/articles/heroku-cli"
    exit 1
fi

# Login to Heroku
echo "Logging into Heroku..."
heroku login

# Create Heroku app (you can modify the name or let Heroku generate one)
echo ""
echo "Creating Heroku app..."
read -p "Enter your app name (or press Enter for random name): " APP_NAME

if [ -z "$APP_NAME" ]; then
    heroku create
else
    heroku create $APP_NAME
fi

# Get the app name
APP_NAME=$(heroku apps:info | grep "=== " | awk '{print $2}')
echo "App created: $APP_NAME"

# Set environment variables
echo ""
echo "Setting environment variables..."
heroku config:set NODE_ENV=production

# Generate JWT secrets
echo "Generating JWT secrets..."
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_REFRESH_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

heroku config:set JWT_SECRET=$JWT_SECRET
heroku config:set JWT_REFRESH_SECRET=$JWT_REFRESH_SECRET

# Set client URL
heroku config:set CLIENT_URL=https://$APP_NAME.herokuapp.com

# Prompt for MongoDB URI
echo ""
echo "MongoDB Setup Options:"
echo "1. Use Heroku MongoDB add-on (mongolab)"
echo "2. Use MongoDB Atlas (you provide connection string)"
read -p "Choose option (1 or 2): " MONGO_OPTION

if [ "$MONGO_OPTION" == "1" ]; then
    echo "Adding MongoDB add-on..."
    heroku addons:create mongolab:sandbox
elif [ "$MONGO_OPTION" == "2" ]; then
    read -p "Enter your MongoDB Atlas connection string: " MONGO_URI
    heroku config:set MONGODB_URI="$MONGO_URI"
else
    echo "Invalid option. You'll need to set MONGODB_URI manually later."
fi

# Commit changes
echo ""
echo "Committing changes..."
git add .
git commit -m "Prepare for Heroku deployment"

# Add Heroku remote
echo "Adding Heroku remote..."
heroku git:remote -a $APP_NAME

# Deploy to Heroku
echo ""
echo "Deploying to Heroku..."
git push heroku main || git push heroku master

# Scale dyno
echo ""
echo "Scaling dyno..."
heroku ps:scale web=1

# Display app info
echo ""
echo "====================================="
echo "Deployment Complete!"
echo "====================================="
echo ""
echo "Your app is available at: https://$APP_NAME.herokuapp.com"
echo ""
echo "Useful commands:"
echo "  heroku logs --tail          # View logs"
echo "  heroku open                 # Open app in browser"
echo "  heroku config               # View environment variables"
echo "  heroku restart              # Restart app"
echo ""

# Open app
read -p "Open app in browser now? (y/n): " OPEN_APP
if [ "$OPEN_APP" == "y" ]; then
    heroku open
fi

echo ""
echo "Done!"
