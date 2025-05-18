// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // Our database connection function

// Import route files (we will create these routes next)
const educationRoutes = require('./routes/educationRoutes');
const skillRoutes = require('./routes/skillRoutes');
const projectRoutes = require('./routes/projectRoutes');
const experienceRoutes = require('./routes/experienceRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

// Middleware
// As per assignment: "Use the `cors` package to allow requests from the frontend (http://localhost:3000)."
app.use(cors({
    origin: 'http://localhost:3000', // Allow only the React frontend
    credentials: true // If you plan to use cookies or sessions
}));
// As per assignment: "Middleware for JSON parsing (express.json)"
app.use(express.json()); // Middleware to parse JSON request bodies

// Define a simple root route for testing
app.get('/', (req, res) => {
    res.send('Portfolio API Running!');
});

// Mount Routers (Define API endpoints)
// These base paths match the assignment's "Endpoints to implement" section: /api/<entity>
app.use('/api/education', educationRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experience', experienceRoutes);


// Basic Error Handling Middleware (as per "Error handling middleware (if implemented)")
// This should be one of the last middleware registered
app.use((err, req, res, next) => {
    console.error(err.stack); // Log error stack for debugging
    // Ensure a default status if none is set on the error object
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        error: err.message || 'Something broke on the server!'
    });
});


// Define the Port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});