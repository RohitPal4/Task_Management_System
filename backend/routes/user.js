const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/sign-in', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (username.length < 3) {
            return res.status(400).json({ message: 'Username must be at least 3 characters' });
        }

        // Check if user already exists by username or email
        const existingUser = await User.findOne({ 
            $or: [{ username: username }, { email: email }]
        });

        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ message: 'Username already exists' });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ message: 'Email already exists' });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user without hashing password
        const newUser = new User({ username, email, password: hashedPassword });

        

        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// login api
router.post('/login', async (req, res) =>{
    try {
        const {username, password} = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { id: user._id, username: user.username }, 
            process.env.JWT_SECRET|| 'secret', 
            { expiresIn: '2d' }
        );

        

        res.status(200).json({id: user._id,username: user.username, token: token});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;




