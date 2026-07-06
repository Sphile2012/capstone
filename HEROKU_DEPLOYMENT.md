# Heroku Deployment Guide

## Prerequisites

1. Heroku account (sign up at https://heroku.com)
2. Heroku CLI installed
3. Git installed

## Step-by-Step Deployment

### 1. Install Heroku CLI

Download and install from: https://devcenter.heroku.com/articles/heroku-cli

Verify installation:
```bash
heroku --version
```

### 2. Login to Heroku

```bash
heroku login
```

### 3. Create Heroku App

```bash
heroku create your-app-name
```

Or let Heroku generate a name:
```bash
heroku create
```

### 4. Add MongoDB Database

Use MongoDB Atlas (recommended) or Heroku add-on:

**Option A: MongoDB Atlas (Free Tier)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Add to Heroku config vars

**Option B: Heroku mLab Add-on**
```bash
heroku addons:create mongolab:sandbox
```

### 5. Configure Environment Variables

Set all required environment variables:

```bash
heroku config:set MONGODB_URI="your_mongodb_connection_string"
heroku config:set JWT_SECRET="your_jwt_secret_key_here"
heroku config:set JWT_REFRESH_SECRET="your_refresh_secret_here"
heroku config:set NODE_ENV=production
heroku config:set CLIENT_URL="https://your-app-name.herokuapp.com"
```

Optional configurations for full features:
```bash
heroku config:set SMTP_HOST="smtp.gmail.com"
heroku config:set SMTP_PORT=587
heroku config:set SMTP_USER="your_email@gmail.com"
heroku config:set SMTP_PASSWORD="your_app_password"
heroku config:set EMAIL_FROM="noreply@yourapp.com"

heroku config:set STRIPE_SECRET_KEY="your_stripe_secret"
heroku config:set STRIPE_PUBLISHABLE_KEY="your_stripe_public"

heroku config:set CLOUDINARY_CLOUD_NAME="your_cloud_name"
heroku config:set CLOUDINARY_API_KEY="your_api_key"
heroku config:set CLOUDINARY_API_SECRET="your_api_secret"

heroku config:set TWILIO_ACCOUNT_SID="your_twilio_sid"
heroku config:set TWILIO_AUTH_TOKEN="your_twilio_token"
heroku config:set TWILIO_PHONE_NUMBER="your_twilio_number"
```

### 6. Deploy to Heroku

Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit for Heroku deployment"
```

Add Heroku remote and deploy:
```bash
heroku git:remote -a your-app-name
git push heroku main
```

Or if using master branch:
```bash
git push heroku master
```

### 7. Open Your Application

```bash
heroku open
```

### 8. View Logs

To check application logs:
```bash
heroku logs --tail
```

## Troubleshooting

### Application Error

Check logs:
```bash
heroku logs --tail
```

### Database Connection Issues

Verify MongoDB URI:
```bash
heroku config:get MONGODB_URI
```

Update if needed:
```bash
heroku config:set MONGODB_URI="your_connection_string"
```

### Build Failures

Check build logs:
```bash
heroku logs --tail
```

Common issues:
- Missing dependencies: Check package.json
- Node version: Verify engines in package.json
- Build script: Ensure heroku-postbuild script exists

### Environment Variables

List all config vars:
```bash
heroku config
```

Set a new variable:
```bash
heroku config:set VARIABLE_NAME="value"
```

Remove a variable:
```bash
heroku config:unset VARIABLE_NAME
```

## Updating Your Application

After making changes:

```bash
git add .
git commit -m "Description of changes"
git push heroku main
```

## Scaling

To scale dynos:
```bash
heroku ps:scale web=1
```

## Custom Domain

Add custom domain:
```bash
heroku domains:add www.yourdomain.com
```

## SSL Certificate

Heroku provides free SSL certificates:
```bash
heroku certs:auto:enable
```

## Monitoring

View application metrics:
```bash
heroku logs --tail
heroku ps
heroku releases
```

## Cost Considerations

**Free Tier Limitations:**
- App sleeps after 30 mins of inactivity
- 550-1000 free dyno hours per month
- Limited to 512MB RAM

**Upgrade Options:**
- Hobby: $7/month - Never sleeps
- Standard: $25/month - More resources
- Performance: $250+/month - High traffic

## Important Notes

1. **MongoDB Atlas** is recommended over Heroku add-ons for MongoDB
2. **Environment variables** must be set via Heroku config
3. **.env file** is not deployed - use Heroku config vars
4. **Build process** automatically runs during deployment
5. **Free tier apps** sleep after 30 minutes of inactivity

## Post-Deployment Checklist

- [ ] Application loads successfully
- [ ] Database connection works
- [ ] User registration works
- [ ] Login/logout functions properly
- [ ] API endpoints respond correctly
- [ ] Static files (images, CSS) load
- [ ] Environment variables configured
- [ ] SSL certificate active
- [ ] Custom domain configured (optional)
- [ ] Monitoring setup

## Useful Commands

```bash
# Restart application
heroku restart

# Run bash on dyno
heroku run bash

# View dyno status
heroku ps

# View releases
heroku releases

# Rollback to previous version
heroku rollback

# Scale dynos
heroku ps:scale web=1

# Open app in browser
heroku open

# View config vars
heroku config

# Add buildpack
heroku buildpacks:add heroku/nodejs
```

## Support

- Heroku Documentation: https://devcenter.heroku.com/
- Heroku Status: https://status.heroku.com/
- Support: https://help.heroku.com/

## Security Best Practices

1. Never commit .env file to repository
2. Use strong JWT secrets (32+ characters)
3. Enable Heroku's automatic certificate management
4. Use environment variables for all sensitive data
5. Enable two-factor authentication on Heroku account
6. Regularly update dependencies
7. Monitor logs for suspicious activity

## Continuous Deployment with GitHub

To enable automatic deployments from GitHub:

1. Go to Heroku Dashboard
2. Select your app
3. Go to "Deploy" tab
4. Choose "GitHub" as deployment method
5. Connect your repository
6. Enable "Automatic Deploys" from main/master branch
7. Choose "Wait for CI to pass" if using CI/CD

Now every push to GitHub will automatically deploy to Heroku!
