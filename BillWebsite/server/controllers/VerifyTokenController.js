const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res) => {
  const authHeader = req.headers.authorization;
  console.log("auth header: ", authHeader)
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ valid: false, message: "Unauthorized: No token provided" });
  }

  console.log("auth header pass: ", authHeader)
  const token = authHeader.split(" ")[1];
  console.log("token: ", token)
  try {
    const decoded = jwt.verify(token, process.env.local.JWT_SECRET);
    return res.status(200).json({ valid: true, user: decoded });
  } catch (error) {
    return res.status(401).json({ valid: false, message: "Unauthorized: Invalid token" });
  }
};

module.exports = { verifyToken };
