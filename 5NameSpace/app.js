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

const conn1 = io.of("/conn1");
const conn2 = io.of("/conn2");

// connection 1
conn1.on('connection',(socket)=>{
    console.log("a user connected in conn1")

conn1.emit("info","Send to All user conn1");
    socket.broadcast.emit("info","Brodcast to other user conn1");

    socket.on('disconnect',()=>{
        console.log("user disconnected conn1")
    })
})

// connection 2
conn2.on('connection',(socket)=>{
    console.log("a user connected in conn2")

conn2.emit("info","Send to All user conn2");
    socket.broadcast.emit("info","Brodcast to other user conn2");

    socket.on('disconnect',()=>{
        console.log("user disconnected conn2")
    })
})



server.listen(3000, ()=>{
    console.log("server started")
})
