require("dotenv").config();
var express = require("express");
var app = express();
const port = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const cors= require('cors')
const connectDB = require("./Connection/conn");
connectDB(); 


app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

const AuthRoutes = require("./Routes/user");
const VideoRoutes = require("./Routes/video");
const CommentRoutes = require("./Routes/comment");

app.use("/auth", AuthRoutes);
app.use("/api", VideoRoutes);
app.use("/commentApi", CommentRoutes);

app.listen(port, () => console.log("backend started on port 4000"));
