var net = require('net'),
    clients = [],
    _ = require('underscore');

net.createServer(function(socket){
  if (clients.indexOf(socket) === -1){
    clients.push(socket);
  }
  socket.on('data', function(d){
    var nonMe = _.filter(clients, function(e){
      return e !== socket;
    });
    _.each(nonMe, function(e){
      e.write(d.toString());
    });
  });
  socket.on('close', function(s){
    clients.splice(clients.indexOf(socket), 1);
  });
}).listen(process.env.PORT || 8080);


