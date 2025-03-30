// midle ware for authentication
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateToken = async(req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if(!token) return res.status(401).json({message: 'Unauthorized'});

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
        const user = await User.findById(decoded.id);
        if(!user) return res.status(401).json({message: 'Unauthorized'});
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token expired' });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {authenticateToken};