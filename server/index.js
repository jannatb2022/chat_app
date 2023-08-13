const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const socket = require("socket.io");

app.use(cors());
app.use(express.json());

// routes_____

const authRoute = require("./routes/Auth");
const messageRoute = require("./routes/Message");




app.use("/api/auth", authRoute);
app.use("/api", messageRoute)

mongoose.connect(process.env.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("db connection successful"))
.catch((err) => console.log(err));

const server = app.listen(8080, ()=>{
    console.log('backend server is running at 8080');
});

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
});

global.onlineUsers = new Map();
io.on("connection", (socket)=>{
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId, socket.id);
    });
    console.log('connected', onlineUsers);
})