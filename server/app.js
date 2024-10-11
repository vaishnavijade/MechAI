const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors'); 
const app = express();

dotenv.config({ path: './config.env' });

// Database connection
require('./db/conn');

// Middlewares
app.use(cors()); // Enable CORS
app.use(express.json()); // To parse JSON bodies

// Link to router files
app.use(require('./router/auth')); // Make sure this is the correct path to auth.js

// Middleware for specific routes (if needed)
const middleware = (req, res, next) => {
    console.log('Middleware executed');
    next();
};

// Routes
app.get('/', (req, res) => {
    res.send('Hello World from the server!');
});

app.get('/Home', (req, res) => {
    res.send('home!');
});

app.get('/About', middleware, (req, res) => {
    res.send('about us!');
});

app.get('/Contact', (req, res) => {
    res.send('our services');
});

app.get('/Login', (req, res) => {
    res.send('login page');
});

app.get('/Signup', (req, res) => {
    res.send('signup page');
});

// Start server
const PORT = process.env.PORT || 5000; // Default to port 5000 if not in the .env file
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
