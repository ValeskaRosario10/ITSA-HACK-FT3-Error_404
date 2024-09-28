const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
require('dotenv').config();  // Make sure this is at the very top of the file

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for specific origin
app.use(cors({
  origin: 'http://localhost:3000', // Allow only your frontend's origin
}));

// Load the MongoDB URI from environment variables
const mongoURI = process.env.MONGODB_URI;

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

// Routes and other logic
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
