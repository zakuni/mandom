var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 5000

app.use(express.static(__dirname + "/"))

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('time', function(msg){
    console.log('time: ' + msg);
    io.emit('time', msg);
  });
});

http.listen(port)

console.log("http server listening on %d", port)
