const jwtToken = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // 👈 get Bearer token

  if (!token)
    return res.status(401).json({ message: "Login to make this request" });

  jwtToken.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
    if (err)
      return res.status(401).json({ message: "Login to make this request" });
    req.user = decodedToken;
    next();
  });
};

module.exports = requireAuth;
