const bcrypt = require("bcrypt");
const UserModel = require("../models/user.model");
const salt = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          return res
            .status(500)
            .json({ message: "Something went wrong, please try again later" });
        } else {
          await UserModel.create({ name, email, password: hash, role });
          return res
            .status(201)
            .json({ message: "Signup successful, please login." });
        }
      });
    } else {
      return res
        .status(400)
        .json({ message: "Account already exists, please login" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later!" });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found, please signup" });
    }
    const hash = user.password;
    const match = await bcrypt.compare(password, hash);
    if (!match) {
      return res
        .status(401)
        .json({ message: "The password you entered is wrong" });
    }
    const accessToken = jwt.sign(
      { userId: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: 60 * 15 }
    );
    const refreshToken = jwt.sign(
      { userId: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET_KEY,
      { expiresIn: 60 * 60 * 24 }
    );
    res.setHeader("authorization", `Bearer ${accessToken}`)
    res.setHeader("refreshtoken", `Bearer ${refreshToken}`)
    const {name}=user
    res.status(200).json({message:"Login successful",accessToken,refreshToken,name,email})
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong, please try again later." });
  }
};

module.exports = { signup, signIn };
//changed
