// authenticate.js
const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from header

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = verified._id; // Attach user ID to request
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    res.status(401).json({ success: false, message: "Token is invalid or expired" });
  }
};

module.exports = authenticate;
