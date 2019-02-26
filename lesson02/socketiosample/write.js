const io = require('socket.io-client');

const socket =
  io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');

socket.emit('message', {
  username: 'Andreas',
  content: 'Hej!',
}, (bla) => {
  console.log(bla);
  process.exit(0);
});

