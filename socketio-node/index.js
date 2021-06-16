const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:3001', 'http://localhost:4200']
  }
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  console.log('token', token);
  next();
});

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  const clientId = socket.client.id;

  // On a recu une demande de connexion d'un utilisateur
  // Ici on pourrait utiliser une logique d'auth ou autre pour "identifier" le stream et le lier a un
  // user en particulier et garder une collection de sockets associees a leurs users
  console.log('a user is connected', socket.client.id);

  socket.on('disconnect', () => {
    console.log('user is disconnected');
  });

  // CHANNEL :: CHAT
  socket.on('chat', (msg) => {
    console.log(`message sur le chat de ${clientId}: ${msg}`);

    io.emit('chat-server', msg);
  });

  // CHANNEL :: MARCO
  socket.on('marco', (msg) => {
    console.log(`Marco! from frontend, let's play`);
    io.emit('marco', `Polo !`);
  });

  // CHANNEL :: PING
  setInterval(() => {
    io.emit('ping', { 
      type: 'ping',
      payload: Math.random().toString()
    });
  }, 10000);
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
