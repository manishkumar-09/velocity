const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(403).json({ message: "Unauthorized user" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "Token not provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = decoded.userId;
      next();
    });
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = auth;
