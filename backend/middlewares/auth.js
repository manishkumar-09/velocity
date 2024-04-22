const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = async (req, res, next) => {
  const authHeader = req.headers?.authorization;
  if (authHeader && startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } else {
    res.status(401).json({
      message: "You are authorized",
    });
  }
};

module.exports = { auth };
