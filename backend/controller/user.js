const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { setUser } = require("../services/auth");
require("dotenv").config();

async function handleSignUp(req, res) {
  // console.log(req.body)
  try {
    const { fullName, email, password } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const isUserExists = await User.findOne({email})
    if(isUserExists){
        return res.status(400).json({message: "Enter a valid email"})
    }
    const user = await User.create({
      fullName,
      email,
      password: passwordHash,
    });
    if (user) {
      return res.status(201).json({ message: "Signned up!" });
    }
  } catch (err) {
    console.log("Some error occured : ", err);
  }
}
async function handleLogin(req, res) {
  //   console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isAuth = bcrypt.compareSync(password, user.password);
    if (!isAuth) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = setUser(user);

    if (process.env.mode == "development") {
      return res.status(200).json({ message: "Logged in!", token });
    } else {
      res.cookie("uid", token, {
        httpOnly: false,
        secure: true,
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({ message: "Logged in!" });
    }
  } catch (err) {
    console.log("Some error occured : ", err);
  }
}

module.exports = {
  handleSignUp,
  handleLogin,
};
