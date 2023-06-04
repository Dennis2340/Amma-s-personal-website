const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) return res.status(403).send("Access Denied");

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    // Check if the token has expired
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    if (verified.exp < currentTime) {
      return res.status(401).json({ msg: "Token has expired. Please login again." });
    }

    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = verifyToken;
