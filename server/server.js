'use strict';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

let userSessions = {};
let userNicknames = [];

io.on('connection', (socket) => {
  socket.on('disconnect', function(){
    let tmp = userSessions[socket.id];
    userNicknames.splice( userNicknames.indexOf(tmp),1 );
    io.emit('user', {type:'new-user', text: userNicknames});
    console.log(tmp + ' disconnected');
  });
  
  socket.on('add-message', (message) => {
    io.emit('message', {type:'new-message', text: message});    
  });

  socket.on('add-user', (user) => {
    userSessions[socket.id] = user;
    userNicknames.push(user);
    io.emit('user', {type:'new-user', text: userNicknames});
    console.log('new user: ' + user);
  });
});

http.listen(5000, () => {
  console.log('started on port 5000');
});
