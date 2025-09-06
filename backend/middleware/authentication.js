const JWT = require("jsonwebtoken");
const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return next();
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id)
    next()
}

module.exports = isAuthenticated