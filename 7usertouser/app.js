const express = require("express");
const http = require("http");
const {Server} = require("socket.io")
const { join } = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req,res)=>{
    res.sendFile(join(__dirname,'index.html'))
})

io.on('connection', (socket) => {
    console.log(`user connected with userId=${socket.id}`)
    socket.emit("userID",`${socket.id}`)
    socket.on("message", (data)=>{
        io.to(data.userID).emit("info", data.msg)
    })

    socket.on('disconnect', () => {
        console.log("user disconnected")
    })
})


server.listen(3000, ()=>{
    console.log("server started")
})
