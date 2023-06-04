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
    const expirationTime = 60; // Expiration time in seconds (1 minute)
    
    if (verified.exp < currentTime) {
      return res.status(401).json({ msg: "Token has expired. Please login again." });
    }

    // Check if the token is within the expiration time
    if (verified.exp - currentTime < expirationTime) {
      // Refresh the token or perform any necessary action
      // For example, you can issue a new token here
      
      // Set the new expiration time
      verified.exp = currentTime + expirationTime;
      
      // Generate a new token with the updated expiration time
      const newToken = jwt.sign(verified, process.env.JWT_SECRET);

      // Set the new token in the response header or send it in the response body
      res.setHeader("Authorization", `Bearer ${newToken}`);
    }

    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = verifyToken;
