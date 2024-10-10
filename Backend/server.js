const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const mobileRoutes = require('./routes/mobiles');

const app = express();

// Middleware

// Helmet for securing headers
app.use(helmet());

// CORS for cross-origin requests
app.use(cors());

// Morgan for logging
app.use(morgan('dev'));

// Express JSON parser for handling JSON requests
app.use(express.json());

// Rate limiting for API requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});
app.use(limiter);

// Connect to MongoDB
mongoose.connect('mongodb+srv://jay:%23jay%40345@jay.aj2ou.mongodb.net/mobileDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

// Routes
app.use('/api/mobiles', mobileRoutes);

// Error Handling
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
