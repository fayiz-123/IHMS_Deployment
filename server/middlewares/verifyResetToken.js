const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyResetToken = (req, res, next) => {
    try {
        const {token} = req.params

        if (!token) {
            return res.status(400).json({ success: false, message: "Reset token is required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_PASSWORD_RESET_KEY);
        req.userId = decoded.userId;

        next();
    } catch (error) {
        return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }
};

module.exports = verifyResetToken;
