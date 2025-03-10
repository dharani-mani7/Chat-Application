const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("message", (data) => {
        io.emit("message", data);  // Broadcast message to all clients
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});
server.listen(3001, () => {
    console.log("Server running on port 3001");
});

