const jwt = require("jsonwebtoken");
const User = require("../Modals/user");
require("dotenv").config();
const auth = async (req, res, next) => {
  console.log("🛡️ AUTH MIDDLEWARE TRIGGERED");
  console.log("Cookies:", req.cookies);
  console.log("Headers:", req.headers);
  console.log("Token from cookies:", req.cookies.token);
  const token = req.cookies.token;
  if (!token) {
    console.log("❌ No token found - returning 401");
    return res.status(401).json({ error: "no token, authorization denied" });
  } else {
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user=await User.findById(decode.userId).select('-password')
        console.log("✅ User authenticated:", req.user._id);
        next()
    } catch (err) {
      console.log("❌ Token verification failed:", err.message);
      res.status(401).json({ error: "token is not valid" });
    }
  }
};

module.exports=auth;