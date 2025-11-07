const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]; // Format: "Bearer TOKEN"
        if (!token) {
            throw new Error('Authentication failed!');
        }
        
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'votre_secret_jwt');
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Authentication failed!"
        });
    }
};

module.exports = authMiddleware;