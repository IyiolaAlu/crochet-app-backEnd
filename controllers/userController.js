const User = require("../models/userModel");
const jwtToken = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, isAdmin) => {
  return jwtToken.sign({ id, isAdmin }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};


exports.signUp = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const user = await User.create({ firstName, lastName, email, password });
    const token = createToken(user._id, user.isAdmin);
    
    const userData = await User.findById(user._id).select("-password");
    res.status(201).json({ user: userData, token });
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res, next) => {
  try {
    res.status(200).json({ message: "User Logged Out" });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    const token = createToken(user._id, user.isAdmin)
    const userData = await User.findById(user._id).select("-password")
    res.status(200).json({ user: userData, token })  // 👈 send token in body
  } catch (error) {
    next(error)
  }
}

exports.me = async (req, res, next) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id).select("-password");
    
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};