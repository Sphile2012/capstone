# Vacation Rental Marketplace - Full Stack Application

A comprehensive accommodation booking platform with features for guests, hosts, and administrators.

## Features

### Authentication
- Sign Up / Log In / Log Out
- OAuth integration (Google, Facebook, Apple) - structure ready
- Email and phone verification
- Password reset functionality
- Two-factor authentication (2FA)
- Session management with JWT

### Guest Features
- Advanced search with filters
- Property browsing by categories
- Interactive map search
- Booking management
- Wishlist functionality
- Reviews and ratings
- Messaging with hosts
- Payment processing
- Trip history

### Host Features
- Listing management
- Calendar and availability
- Dynamic pricing tools
- Earnings dashboard
- Guest management
- Co-host support
- Analytics and insights
- Automated messaging

### Admin Features
- User management
- Listing moderation
- Booking oversight
- Payment management
- Analytics dashboard
- Fraud detection
- Customer support tools
- System configuration

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT authentication
- Socket.io for real-time chat
- Stripe for payments
- Cloudinary for image storage
- Nodemailer for emails
- Twilio for SMS

### Frontend
- React with hooks
- React Router for navigation
- Context API for state management
- Axios for API calls
- Mapbox/Google Maps for location
- Socket.io-client for real-time features
- Responsive design with CSS modules

## Quick Start

1. Install dependencies:
```bash
npm install
cd client && npm install && cd ..
```

2. Set up environment variables:
```bash
copy .env.example .env
```

Edit `.env` and set at minimum:
- `MONGODB_URI=mongodb://localhost:27017/airbnb-clone`
- `JWT_SECRET=your_secret_key_here`
- `CLIENT_URL=http://localhost:3000`

3. Start MongoDB (ensure it's running)

4. Run the application:
```bash
npm run dev
```

The server will run on **http://localhost:5000**
The client will run on **http://localhost:3000**

**For detailed setup instructions, see [SETUP.md](SETUP.md)**

## Project Structure

```
airbnb-clone/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context providers
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # API services
│   │   ├── utils/         # Utility functions
│   │   └── styles/        # Global styles
├── server/                # Node.js backend
│   ├── config/           # Configuration files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Helper functions
│   └── index.js          # Entry point
└── uploads/              # File uploads directory

```

## API Documentation

### Authentication Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/forgot-password
- POST /api/auth/reset-password
- POST /api/auth/verify-email
- POST /api/auth/verify-phone
- POST /api/auth/enable-2fa
- GET /api/auth/google
- GET /api/auth/facebook
- GET /api/auth/apple

### User Endpoints
- GET /api/users/profile
- PUT /api/users/profile
- POST /api/users/upload-avatar
- POST /api/users/verify-identity

### Listing Endpoints
- GET /api/listings
- GET /api/listings/:id
- POST /api/listings
- PUT /api/listings/:id
- DELETE /api/listings/:id
- GET /api/listings/search

### Booking Endpoints
- POST /api/bookings
- GET /api/bookings
- GET /api/bookings/:id
- PUT /api/bookings/:id
- DELETE /api/bookings/:id

### Payment Endpoints
- POST /api/payments/create-intent
- POST /api/payments/confirm
- GET /api/payments/methods
- POST /api/payments/refund

### Review Endpoints
- POST /api/reviews
- GET /api/reviews/listing/:listingId
- GET /api/reviews/user/:userId
- PUT /api/reviews/:id
- DELETE /api/reviews/:id

### Message Endpoints
- POST /api/messages
- GET /api/messages/conversation/:userId
- GET /api/messages/conversations
- PUT /api/messages/:id/read

### Admin Endpoints
- GET /api/admin/users
- GET /api/admin/listings
- GET /api/admin/bookings
- GET /api/admin/analytics
- PUT /api/admin/users/:id
- DELETE /api/admin/listings/:id

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting
- CORS protection
- Helmet.js for HTTP headers
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License
