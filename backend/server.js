// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const donorRoutes = require('./routes/donors');
const requestRoutes = require('./routes/request');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

// Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('Mongo connect error:', err);
    process.exit(1);
  });

// Routes
app.use('/api/donors', donorRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/auth', authRoutes);

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
