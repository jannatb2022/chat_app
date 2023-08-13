const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
require("dotenv").config();

const socket = require("socket.io");
const { Server } = require("socket.io")

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

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

 server.listen(8080, ()=>{
    console.log('backend server is running at 8080');
});

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
});

global.onlineUsers = new Map();
io.on("connection", (socket)=>{
    console.log('connected.....');

    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId, socket.id);
    });
    console.log('connected', onlineUsers);

    socket.on("send-msg", (data)=>{
        const senduser = onlineUsers.get(data.to);
        if(senduser){
            socket.to(senduser).emit("msg-receive", data.msg)
        }
    })
})