require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const scoreRoutes = require('./routes/scores');
const passport = require('passport');
require('./config/passport'); 
const session = require('express-session');

const app = express();
connectDB();

// CORS Middleware (must be first)
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Set Access-Control-Allow-Origin header for all responses and handle OPTIONS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.CLIENT_URL);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Log inbound connections
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

// Session (for Google OAuth)
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/auth', require('./routes/googleAuth')); 

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));
