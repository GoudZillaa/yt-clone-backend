const jwt = require("jsonwebtoken");
const User = require("../Modals/user");
require("dotenv").config();
const auth = async (req, res, next) => {
  console.log("🛡️ AUTH MIDDLEWARE TRIGGERED");
  console.log("Cookies:", req.cookies);
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ error: "no token, authorization denied" });
  } else {
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user=await User.findById(decode.userId).select('-password')
        next()
    } catch (err) {
      res.status(401).json({ error: "token is not valid" });
    }
  }
};

module.exports=auth;