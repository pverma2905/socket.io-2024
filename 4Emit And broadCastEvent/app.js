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


io.on('connection',(socket)=>{
    console.log("a user connected")


    io.emit("info","Send to All user");
    socket.broadcast.emit("info","Brodcast to other user");

    socket.on('disconnect',()=>{
        console.log("user disconnected")
    })

   

})

server.listen(3000, ()=>{
    console.log("server started")
})