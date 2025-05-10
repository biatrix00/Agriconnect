const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Debug: Log the MongoDB URI (without password)
console.log('MongoDB URI:', process.env.MONGO_URI ? process.env.MONGO_URI.replace(/:[^:@]*@/, ':****@') : 'Not found');

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes (to be implemented)
const authRoutes = require('./routes/auth');
const aiRoutes = require('./routes/ai');
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/weather', require('./routes/weather'));
app.use('/api/crops', require('./routes/crops'));
app.use('/api/market', require('./routes/market'));
app.use('/api/schemes', require('./routes/schemes'));
app.use('/api/forum', require('./routes/forum'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 