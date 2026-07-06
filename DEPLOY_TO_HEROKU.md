# Deploy to Heroku - Quick Guide

## ✅ Your code is now on GitHub!

Repository: https://github.com/Sphile2012/capstone

## Step 1: Install Heroku CLI

Download from: https://devcenter.heroku.com/articles/heroku-cli

Or use npm:
```bash
npm install -g heroku
```

Verify installation:
```bash
heroku --version
```

## Step 2: Login to Heroku

```bash
heroku login
```

This will open a browser window for authentication.

## Step 3: Create Heroku App

```bash
cd "C:\Users\Phumeh\OneDrive\Desktop\airbnb"
heroku create your-app-name
```

Or let Heroku generate a name:
```bash
heroku create
```

## Step 4: Add MongoDB Database

### Option A: MongoDB Atlas (Recommended - Free Tier)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster (choose free tier)
4. Create database user
5. Whitelist all IPs (0.0.0.0/0) for Heroku
6. Get connection string

Then set in Heroku:
```bash
heroku config:set MONGODB_URI="your_connection_string_here"
```

### Option B: Heroku mLab Add-on

```bash
heroku addons:create mongolab:sandbox
```

## Step 5: Set Environment Variables

**Required variables:**
```bash
heroku config:set JWT_SECRET="your_strong_secret_key_at_least_32_characters_long"
heroku config:set JWT_REFRESH_SECRET="another_strong_secret_different_from_above"
heroku config:set NODE_ENV=production
```

Get your app URL after creation, then:
```bash
heroku config:set CLIENT_URL="https://your-app-name.herokuapp.com"
```

**Optional variables (for full features):**

Email (Gmail example):
```bash
heroku config:set SMTP_HOST=smtp.gmail.com
heroku config:set SMTP_PORT=587
heroku config:set SMTP_USER=your.email@gmail.com
heroku config:set SMTP_PASSWORD=your_gmail_app_password
heroku config:set EMAIL_FROM=noreply@yourapp.com
```

Stripe payments:
```bash
heroku config:set STRIPE_SECRET_KEY=sk_test_your_key
heroku config:set STRIPE_PUBLISHABLE_KEY=pk_test_your_key
```

## Step 6: Deploy to Heroku

```bash
git push heroku main
```

The deployment process will:
- Install dependencies
- Build React frontend
- Start the Node.js server

## Step 7: Open Your App

```bash
heroku open
```

Or visit: https://your-app-name.herokuapp.com

## Step 8: View Logs

```bash
heroku logs --tail
```

## Troubleshooting

### "Application Error"

Check logs:
```bash
heroku logs --tail
```

Common issues:
1. **Database connection failed**: Check MONGODB_URI
2. **Build failed**: Check build logs
3. **Port issue**: Heroku sets PORT automatically

### Check Configuration

```bash
heroku config
```

### Restart App

```bash
heroku restart
```

### Check Dyno Status

```bash
heroku ps
```

## Continuous Deployment from GitHub

1. Go to Heroku Dashboard: https://dashboard.heroku.com
2. Select your app
3. Click "Deploy" tab
4. Choose "GitHub" as deployment method
5. Connect your repository: Sphile2012/capstone
6. Enable "Automatic Deploys" from main branch
7. Choose "Wait for CI to pass before deploy"

Now every push to GitHub will automatically deploy to Heroku!

## Environment Setup Checklist

- [ ] Heroku CLI installed
- [ ] Logged into Heroku
- [ ] App created on Heroku
- [ ] MongoDB database configured
- [ ] JWT_SECRET set
- [ ] JWT_REFRESH_SECRET set
- [ ] NODE_ENV=production set
- [ ] CLIENT_URL set to Heroku app URL
- [ ] Optional services configured (email, Stripe, etc.)
- [ ] Code pushed to Heroku
- [ ] App opens successfully
- [ ] Can register a user
- [ ] Can log in
- [ ] Database connection working

## Quick Commands Reference

```bash
# Create app
heroku create

# Set config variable
heroku config:set KEY=value

# View all config
heroku config

# Deploy
git push heroku main

# View logs
heroku logs --tail

# Restart
heroku restart

# Open app
heroku open

# Check status
heroku ps

# Scale dynos
heroku ps:scale web=1

# Run bash on dyno
heroku run bash
```

## Free Tier Limitations

- App sleeps after 30 minutes of inactivity
- 550-1000 free dyno hours per month
- Limited to 512MB RAM
- First request after sleep takes longer (cold start)

## Upgrade for Production

To prevent sleeping and get better performance:

```bash
heroku ps:scale web=1:hobby
```

Cost: $7/month for Hobby tier (never sleeps)

## Support

- Heroku Docs: https://devcenter.heroku.com/
- Status: https://status.heroku.com/
- GitHub Repo: https://github.com/Sphile2012/capstone

## Project Features

Your vacation rental platform includes:
- ✅ User authentication & profiles
- ✅ Property listings management
- ✅ Search & filtering
- ✅ Booking system
- ✅ Reviews & ratings
- ✅ Real-time messaging
- ✅ Wishlists
- ✅ Host dashboard
- ✅ Admin panel
- ✅ Experiences
- ✅ Payment infrastructure (Stripe)

## Security Notes

- All sensitive data is in environment variables
- Passwords are hashed with bcrypt
- JWT tokens for authentication
- Rate limiting enabled
- Input validation active
- CORS configured
- Production-ready error handling

---

**Next Steps:**
1. Follow steps 1-7 above to deploy
2. Test all functionality
3. Configure optional services as needed
4. Set up continuous deployment from GitHub
5. Monitor your application

Good luck with your deployment! 🚀
