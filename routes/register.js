const express = require('express');
const router = express.Router();
const UserData = require('../models/UserDataModel'); // Import your Mongoose model

router.post('/register', async (req, res) => {
    try {
        // Extract user data from the request body
        const { name, gender, address, email, username, password } = req.body;

        // Validate the user input (add more validation logic as needed)
        if (!name || !gender || !address || !email || !username || !password) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Check if the username is already in use (optional, depending on your requirements)
        const existingUser = await UserData.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists.' });
        }

        // Create a new user document using the Mongoose model
        const newUser = new UserData({
            name,
            gender,
            address,
            email,
            username,
            password
        });

        // Save the new user to the database
        await newUser.save();

        // Send a success response
        res.status(201).json({ message: 'Registration successful!' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
