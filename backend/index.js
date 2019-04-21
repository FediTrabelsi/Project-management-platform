var express =require('express');
const app = express();
const mongoose=require('mongoose');
const config = require('../config/database');
const path = require('path');
var upuser = require('./routes/userData.js');
var project = require('./routes/projects.js');
var authent= require('./routes/authentification.js');
const bodyParser= require('body-parser');
const cors= require('cors'); 
var http = require('http');


mongoose.Promise=global.Promise;
app.use('/uploads',express.static('uploads'))
app.use('/projectUploads',express.static('projectUploads'))

mongoose.connect(config.uri,(err) => {
    if (err){
        console.log('Could not connect to db',err);
    }else{
        console.log('Connected to : '+  config.db);
    }
});


app.use(cors({
    origin:'http://localhost:4200'
}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static( '../Project/dist/'));
app.use('/authentification',authent);
app.use('/user',upuser);
app.use('/projects',project);
app.get('/',(req,res) => {
    res.send('hello');
});
app.listen(8080, () =>{
    console.log('Server listening on port 8080');
});

var server = app.listen('3000');
var io =require('socket.io').listen(server);

io.on('connection',(socket)=>{

    console.log('new connection made.');


    socket.on('join', function(data){
      socket.join(data.room);

      console.log(data.user + ' joined the chat of : ' + data.room);

      socket.broadcast.to(data.room).emit('new user joined', {user:data.user, message:'has joined project chat'});
    });


    socket.on('leave', function(data){
    
      console.log(data.user + ' left the room : ' + data.room);

      socket.broadcast.to(data.room).emit('left room', {user:data.user, message:'has left this room.'});

      socket.leave(data.room);
    });

    socket.on('message',function(data){

      io.in(data.room).emit('new message', {user:data.user, message:data.message});
    })
});