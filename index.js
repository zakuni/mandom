var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 5000

const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('time', function(msg){
    console.log('time: ' + msg);
    io.emit('time', msg);
  });
});

nextApp.prepare().then(() => {
  app.use(express.static(__dirname + "/"));

  http.listen(port, (err) => {
    if (err) throw err;
    console.log("http server listening on %d", port);
  });
});


