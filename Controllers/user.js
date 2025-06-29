const User = require('../Modals/user');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
};

exports.signUp = async (req, res) => {
  try {
    const { channelName, userName, about, profilePic, password } = req.body;
    const isExist = await User.findOne({ userName });

    if (isExist) {
      res.status(400).json({ error: "user already exist, please try a new username" });
    } else {
      let updatedPass = await bcrypt.hash(password, 10);
      let user = new User({ channelName, userName, about, profilePic, password: updatedPass });
      await user.save();
      res.status(201).json({ message: "user registered successfully", success: "yes", data: user });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ userId: user._id }, "Its_My_Secret_Key");
      res.cookie("token", token, cookieOptions);
      res.json({ message: "Logged in successfully", success: "true", token ,'user':user});
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("token", cookieOptions).json({ message: "Logged out Successfully" });
};
