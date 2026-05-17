const mongoose = require("mongoose");
const validate = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: [true, "First name is required"] },
  lastName: { type: String, required: [true, "Last Name is required"] },
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [validate.isEmail, "Please enter a valid email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 character"],
  },
  isAdmin: {type:Boolean, default: false}
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    const error = new Error("incorrect email");
    error.field = "email";
    throw error;
  }

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    const error = new Error("incorrect password");
    error.field = "password";
    throw error;
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
