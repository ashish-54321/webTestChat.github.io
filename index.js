//node server which will handells socket.io conections









const express = require('express')
const app = express()

const http = require('http').createServer(app)

const PORT = process.env.PORT || 4000


http.listen(PORT, () => {
    console.log (`Listening on port ${PORT}`) 
})
app.use(express.static(__dirname + '/')) 

app.get('/', (req,res) =>{
   
    res.sendFile(__dirname + '/chat.html')
    
    
} )
 
/// [ socket.io]/// 
const io = require('socket.io')(http)
var users = {};



io.on('connection', (socket) =>{
    console.log('connected...')

    socket.on('joined-user' , (names)=>{

        users[socket.id]=names; 
      
        io.emit("user-list",users);

        
    })
      

    socket.on('message' , (msg) =>{
        socket.broadcast.emit('message', msg)

    })



    socket.on('disconnect',()=>{
        // var user=users[socket.id];
        socket.broadcast.emit('user-disconnected', usee=users[socket.id]);
        delete users[socket.id];
        io.emit("user-list",users);
    
    })
    
})
