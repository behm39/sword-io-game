var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var Game = require('./game');

const port = 3000 || process.env.PORT;
let game = new Game();

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.send("Hello, World!");
});

http.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

require('./sockets')(io, game);