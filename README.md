# IDK Academy Backend

This is the backend for the IDK Academy project, built with Node.js, Express, MongoDB, and Mongoose. It provides authentication (manual and Google OAuth), email verification, and CRUD operations for student scores.

## Features
- User registration with email verification
- Login with JWT authentication
- Google OAuth login
- CRUD for student scores
- Email notifications and verifications
- Secure password hashing
- Middleware for authentication and email verification

## Project Structure
```
backend/
├── config/           # Database and passport configuration
├── controllers/      # Route controllers (auth, score)
├── middleware/       # Custom middleware (auth, verifyEmail)
├── models/           # Mongoose models (User, Score)
├── routes/           # Express routes (auth, googleAuth, scores)
├── utils/            # Utility functions (sendEmail)
├── .env              # Environment variables (not committed)
├── .gitignore        # Git ignore rules
├── package.json      # Project dependencies and scripts
├── server.js         # Main server entry point
```

## Environment Variables
Create a `.env` file in the root of the backend folder with the following variables:

```
PORT=5000
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
```

## Getting Started
1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the server:**
   ```bash
   npm run dev
   ```
   The server will run on the port specified in `.env` (default: 5000).

## API Endpoints
### Auth
- `POST /api/auth/register` — Register a new user
- `GET /api/auth/verify/:token` — Verify email
- `POST /api/auth/login` — Login
- `GET /auth/google` — Google OAuth login
- `GET /auth/google/callback` — Google OAuth callback

### Scores (Protected)
- `POST /api/scores/` — Create a new score
- `GET /api/scores/` — Get scores (paginated)
- `PUT /api/scores/:id` — Update a score
- `DELETE /api/scores/:id` — Delete a score

## Notes
- All `/api/scores` routes require a valid JWT token in the `Authorization` header.
- Users must verify their email before accessing protected routes (unless using Google OAuth).
- Uses MongoDB Atlas for database (update connection string in `config/db.js` if needed).

## License
MIT
