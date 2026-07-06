# Quick Deployment Guide

## Fast Track to Heroku Deployment

### Prerequisites
- Heroku account (sign up at https://heroku.com)
- Heroku CLI installed (https://devcenter.heroku.com/articles/heroku-cli)
- MongoDB Atlas account (for database) OR use Heroku's MongoDB add-on

### 🚀 Super Quick Deployment (5 minutes)

#### Step 1: Login to Heroku
```bash
heroku login
```

#### Step 2: Create App
```bash
heroku create your-unique-app-name
```

#### Step 3: Set Environment Variables
```bash
# Generate secrets
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_REFRESH=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")

# Set config
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=$JWT_SECRET
heroku config:set JWT_REFRESH_SECRET=$JWT_REFRESH
heroku config:set CLIENT_URL=https://your-unique-app-name.herokuapp.com
```

#### Step 4: Add MongoDB
Option A - Heroku Add-on (easiest):
```bash
heroku addons:create mongolab:sandbox
```

Option B - MongoDB Atlas (free forever):
1. Create cluster at https://www.mongodb.com/cloud/atlas
2. Get connection string
3. Set it:
```bash
heroku config:set MONGODB_URI="your_connection_string_here"
```

#### Step 5: Deploy
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

#### Step 6: Scale & Open
```bash
heroku ps:scale web=1
heroku open
```

### ✅ Verify Deployment

Visit your app URL and test:
- Homepage loads
- Can register user
- Can login
- Can browse listings

### 📊 Monitor

View logs:
```bash
heroku logs --tail
```

### 🔧 Troubleshooting

**App crashes?**
```bash
heroku logs --tail
heroku restart
```

**Database connection failed?**
```bash
heroku config:get MONGODB_URI
# Verify the URI is correct
```

**Build failed?**
```bash
heroku logs
# Check for missing dependencies or syntax errors
```

### 🎯 What's Deployed

Your app now has:
- ✅ User authentication (register/login)
- ✅ Listing management
- ✅ Search functionality
- ✅ Booking system
- ✅ Reviews
- ✅ Messages (real-time chat)
- ✅ Wishlists
- ✅ Host dashboard
- ✅ Admin panel
- ✅ Complete REST API

### 💰 Cost

**Free Tier:**
- Heroku: $0 (app sleeps after 30 min)
- MongoDB: $0 (Atlas free tier)

**Hobby Tier (No Sleep):**
- Heroku: $7/month
- MongoDB: $0
- **Total: $7/month**

### 🔐 Security Checklist

Before going live:
- [ ] All environment variables set
- [ ] Strong JWT secrets generated
- [ ] MongoDB connection secured
- [ ] HTTPS enabled (automatic with Heroku)
- [ ] .env file not committed (check .gitignore)

### 📱 Share Your App

Your app URL:
```
https://your-unique-app-name.herokuapp.com
```

### 🔄 Update & Redeploy

To deploy updates:
```bash
git add .
git commit -m "Your update message"
git push heroku main
```

### 🎓 Next Steps

1. **Custom Domain**
   ```bash
   heroku domains:add www.yourdomain.com
   ```

2. **Enable Metrics**
   ```bash
   heroku labs:enable log-runtime-metrics
   ```

3. **Upgrade Dyno** (for 24/7 uptime)
   ```bash
   heroku ps:type hobby
   ```

4. **Set Up Continuous Deployment**
   - Connect GitHub repo in Heroku dashboard
   - Enable automatic deploys

### 📚 More Help

- Full guide: See HEROKU_DEPLOYMENT.md
- Checklist: See DEPLOYMENT_CHECKLIST.md
- Heroku docs: https://devcenter.heroku.com/

### 🎉 You're Live!

Congratulations! Your rental marketplace is now deployed and accessible worldwide.

---

**Need help?** Check the logs first:
```bash
heroku logs --tail
```
