const jwtToken = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  const token = req.cookies.jwtToken;


  if (!token) {
    return res.status(401).json({ message: "Admin access only" });
  }
  jwtToken.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Admin access only" });
    }

    if (decodedToken.isAdmin === true) {
        next()
    }else{
        return res.status(403).json({ message: "Admin access only" });
    }
  });
};

module.exports = isAdmin;
