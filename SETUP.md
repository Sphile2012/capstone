# Airbnb Clone - Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies

Install root dependencies:
```bash
npm install
```

Install client dependencies:
```bash
cd client
npm install
cd ..
```

### 2. Configure Environment Variables

Copy the example environment file:
```bash
copy .env.example .env
```

Edit `.env` and add your configuration:

**Required:**
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens (use a strong random string)
- `CLIENT_URL` - Frontend URL (http://localhost:3000)

**Optional (for full functionality):**
- Email: SMTP credentials for email verification
- Stripe: API keys for payments
- OAuth: Google, Facebook, Apple credentials
- Twilio: For SMS verification
- Cloudinary: For image uploads
- Google Maps: For location features

### 3. Start MongoDB

Make sure MongoDB is running on your system:
```bash
# Windows (if MongoDB is installed as a service)
net start MongoDB

# Or run mongod directly
mongod
```

### 4. Run the Application

In development mode (runs both frontend and backend):
```bash
npm run dev
```

Or run separately:

Backend (from root):
```bash
npm run server
```

Frontend (from root):
```bash
npm run client
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## Default Ports

- React Frontend: 3000
- Express Backend: 5000
- MongoDB: 27017

## Features Implemented

### Authentication (Complete)
- ✅ Email/Password registration and login
- ✅ JWT token-based authentication
- ✅ Password reset functionality
- ✅ Email verification
- ✅ Phone verification (requires Twilio)
- ✅ Two-factor authentication
- ✅ OAuth ready (Google, Facebook, Apple)
- ✅ Session management with refresh tokens

### User Management (Complete)
- ✅ User profiles
- ✅ Profile editing
- ✅ Avatar upload
- ✅ Identity verification
- ✅ Language preferences
- ✅ Notification settings
- ✅ Privacy settings

### Listings (Complete)
- ✅ Create, read, update, delete listings
- ✅ Property types and room types
- ✅ Amenities management
- ✅ Photo uploads
- ✅ Pricing (base, weekend, discounts)
- ✅ Availability calendar
- ✅ House rules
- ✅ Cancellation policies
- ✅ Instant booking
- ✅ Categories (beach, cabins, etc.)
- ✅ Accessibility features

### Search & Discovery (Complete)
- ✅ Location-based search
- ✅ Date-based availability
- ✅ Guest count filtering
- ✅ Price range filtering
- ✅ Property type filtering
- ✅ Amenities filtering
- ✅ Category browsing
- ✅ Map search (nearby listings)
- ✅ Instant book filter
- ✅ Superhost filter

### Bookings (Complete)
- ✅ Create bookings
- ✅ Booking status management
- ✅ Guest bookings view
- ✅ Host bookings view
- ✅ Booking cancellation
- ✅ Price calculation
- ✅ Guest information
- ✅ Special requests

### Payments (Stripe Integration Ready)
- ✅ Payment intent creation
- ✅ Stripe integration structure
- ⚠️  Requires Stripe API keys to function

### Reviews & Ratings (Complete)
- ✅ Leave reviews
- ✅ Star ratings (overall + categories)
- ✅ Photo reviews
- ✅ Private feedback
- ✅ Host responses
- ✅ Review moderation

### Messaging (Complete)
- ✅ Real-time messaging (Socket.io)
- ✅ Conversations
- ✅ Message attachments
- ✅ Read receipts
- ✅ Typing indicators

### Wishlists (Complete)
- ✅ Create wishlists
- ✅ Add/remove listings
- ✅ Multiple wishlists
- ✅ Private/public wishlists

### Experiences (Complete)
- ✅ Browse experiences
- ✅ Create experiences
- ✅ Category filtering
- ✅ Online experiences support

### Host Dashboard (Complete)
- ✅ Listing management
- ✅ Reservation viewing
- ✅ Calendar management
- ✅ Earnings tracking structure

### Admin Dashboard (Complete)
- ✅ User management
- ✅ Listing oversight
- ✅ Booking management
- ✅ Analytics dashboard
- ✅ Platform statistics

## Testing the Application

### 1. Register a User
- Navigate to http://localhost:3000/register
- Fill in the registration form
- Submit to create an account

### 2. Create a Listing (Become a Host)
- Log in to your account
- Click "Become a Host" or navigate to /host/create-listing
- Fill in listing details
- Submit to create your listing

### 3. Browse Listings
- Return to home page
- Browse by categories
- Use search functionality
- Click on a listing to view details

### 4. Make a Booking
- View a listing
- Click "Reserve"
- Select dates and guests
- Complete booking (payment integration requires Stripe setup)

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login
- POST /api/auth/logout - Logout
- POST /api/auth/forgot-password - Request password reset
- PUT /api/auth/reset-password/:token - Reset password
- GET /api/auth/verify-email/:token - Verify email
- POST /api/auth/verify-phone - Verify phone number
- POST /api/auth/enable-2fa - Enable two-factor auth

### Listings
- GET /api/listings - Get all listings (with filters)
- GET /api/listings/:id - Get single listing
- POST /api/listings - Create listing (auth required)
- PUT /api/listings/:id - Update listing (auth required)
- DELETE /api/listings/:id - Delete listing (auth required)
- GET /api/listings/search/nearby - Search nearby listings

### Bookings
- POST /api/bookings - Create booking (auth required)
- GET /api/bookings/user - Get user bookings (auth required)
- GET /api/bookings/host - Get host bookings (auth required)
- GET /api/bookings/:id - Get booking details (auth required)
- PUT /api/bookings/:id/status - Update booking status (auth required)
- PUT /api/bookings/:id/cancel - Cancel booking (auth required)

### Reviews
- POST /api/reviews - Create review (auth required)
- GET /api/reviews/listing/:listingId - Get listing reviews

### Messages
- POST /api/messages - Send message (auth required)
- GET /api/messages/conversations - Get conversations (auth required)
- GET /api/messages/conversation/:id - Get conversation messages (auth required)

### Wishlists
- POST /api/wishlists - Create wishlist (auth required)
- GET /api/wishlists - Get user wishlists (auth required)
- PUT /api/wishlists/:id/add-listing - Add listing to wishlist (auth required)
- PUT /api/wishlists/:id/remove-listing - Remove from wishlist (auth required)

### Experiences
- GET /api/experiences - Get all experiences
- POST /api/experiences - Create experience (auth required)

### Admin
- GET /api/admin/users - Get all users (admin only)
- GET /api/admin/listings - Get all listings (admin only)
- GET /api/admin/bookings - Get all bookings (admin only)
- GET /api/admin/analytics - Get platform analytics (admin only)

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check MONGODB_URI in .env file
- Verify MongoDB is accessible on the specified port

### Port Already in Use
- Change PORT in .env file
- Kill existing process using the port

### Module Not Found Errors
- Delete node_modules folders
- Run `npm install` again in root and client directories

### CORS Errors
- Ensure CLIENT_URL in .env matches your frontend URL
- Check that proxy is set correctly in client/package.json

## Production Deployment

### Build Frontend
```bash
cd client
npm run build
```

### Environment Variables
Set all required environment variables for production:
- Use strong JWT_SECRET
- Configure production MongoDB
- Set up email service
- Configure Stripe for payments
- Set production CLIENT_URL

### Security Checklist
- [ ] Strong JWT secret
- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] Rate limiting enabled
- [ ] Input validation active
- [ ] CORS properly configured
- [ ] MongoDB secured with authentication

## Support

For issues or questions:
1. Check this setup guide
2. Review error logs
3. Verify environment configuration
4. Check API endpoint responses

## License

MIT License - See LICENSE file for details
