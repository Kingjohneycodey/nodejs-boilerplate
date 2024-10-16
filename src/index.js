const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const path = require('path'); 
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();


app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// connect to database

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log("Connected to database")
    })
    .catch((err) => {
      console.error("Error connecting to database:", err);
    })

// Middlewares
app.use(cors());    // Cross-Origin Resource Sharing
app.use(morgan('dev'));  // HTTP request logger
app.use(express.json());  // Parse JSON bodies

// Home route
app.get('/', (req, res) => {
  res.status(200).json({
      message: 'Welcome to the Home Route!',
      status: 'success'
  });
});


// Routes
app.use('/api', routes);

// Error handling middleware
app.use(errorHandler);

// Start the server

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
