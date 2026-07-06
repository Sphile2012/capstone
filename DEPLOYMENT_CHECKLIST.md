# Pre-Deployment Checklist

Before deploying to Heroku, ensure all items are completed:

## Code Quality & Branding

- [x] Remove all AI-specific terminology
- [x] Replace "Airbnb" with generic "Rental" terminology
- [x] Use standard software patterns
- [x] Clean, readable code structure
- [x] Proper error handling
- [x] Input validation on all forms
- [x] Secure authentication implementation

## Configuration Files

- [x] Procfile created
- [x] app.json created
- [x] .gitignore properly configured
- [x] .slugignore created
- [x] Node version specified in package.json
- [x] Production build script added
- [x] Static file serving configured

## Environment Variables

Required for Heroku:
- [ ] `NODE_ENV=production`
- [ ] `MONGODB_URI` (your database connection)
- [ ] `JWT_SECRET` (strong random string)
- [ ] `JWT_REFRESH_SECRET` (strong random string)
- [ ] `CLIENT_URL` (your Heroku app URL)

Optional (add when ready):
- [ ] Stripe keys (for payments)
- [ ] Email SMTP settings (for notifications)
- [ ] Cloudinary keys (for image uploads)
- [ ] Twilio credentials (for SMS)
- [ ] OAuth credentials (Google, Facebook, Apple)

## Database Setup

- [ ] MongoDB Atlas account created
- [ ] Cluster created
- [ ] Database user created with password
- [ ] IP whitelist set to 0.0.0.0/0 (allow all)
- [ ] Connection string obtained
- [ ] Connection string tested

## Security

- [x] Passwords hashed with bcrypt
- [x] JWT tokens properly configured
- [x] CORS configured correctly
- [x] Helmet.js security headers
- [x] Rate limiting enabled
- [x] Input sanitization
- [x] Environment variables secured
- [ ] Strong secrets generated

## Testing

Test locally before deploying:
- [ ] User registration works
- [ ] User login works
- [ ] Listing creation works
- [ ] Search functionality works
- [ ] Booking flow works
- [ ] All pages load correctly
- [ ] No console errors

## Heroku CLI

- [ ] Heroku CLI installed
- [ ] Heroku account created
- [ ] Logged in via CLI (`heroku login`)

## Git Repository

- [ ] Git initialized
- [ ] All files committed
- [ ] .gitignore working (no .env in repo)
- [ ] Clean commit history

## Deployment Steps

Follow these in order:

1. [ ] Create Heroku app: `heroku create your-app-name`
2. [ ] Add MongoDB: `heroku addons:create mongolab:sandbox`
3. [ ] Set environment variables (see above)
4. [ ] Add Heroku remote: `heroku git:remote -a your-app-name`
5. [ ] Deploy: `git push heroku main`
6. [ ] Scale dyno: `heroku ps:scale web=1`
7. [ ] Open app: `heroku open`
8. [ ] Monitor logs: `heroku logs --tail`

## Post-Deployment Verification

After deployment:
- [ ] App URL loads successfully
- [ ] Homepage displays correctly
- [ ] Can register new user
- [ ] Can login
- [ ] Can create listing
- [ ] Search works
- [ ] No server errors in logs

## Optional Enhancements

- [ ] Custom domain configured
- [ ] SSL certificate enabled
- [ ] Monitoring tools set up
- [ ] Backup strategy implemented
- [ ] Upgrade to hobby dyno (no sleep)
- [ ] Performance optimization
- [ ] SEO optimization

## Common Issues to Watch

1. **Build Fails**: Check logs, verify dependencies
2. **Database Connection**: Verify MongoDB URI and whitelist
3. **Environment Variables**: Double-check all are set
4. **Static Files**: Ensure production build serves correctly
5. **CORS Errors**: Update CLIENT_URL to match Heroku URL

## Generate Strong Secrets

Use this Node command to generate secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run twice to get two different secrets for JWT_SECRET and JWT_REFRESH_SECRET.

## Support Resources

- Heroku Documentation: https://devcenter.heroku.com/
- MongoDB Atlas: https://docs.atlas.mongodb.com/
- Deployment Guide: See HEROKU_DEPLOYMENT.md

## Final Notes

- Keep .env file secure (never commit)
- Save all Heroku config vars
- Document any custom configurations
- Set up monitoring for production issues
- Plan for scaling as user base grows

---

**Ready to Deploy?**

If all items are checked, you're ready to deploy! Follow the step-by-step guide in HEROKU_DEPLOYMENT.md.
