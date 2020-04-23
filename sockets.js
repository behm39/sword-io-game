

function handleSockets(io, game) {
    io.on('connection', (socket) => {
        console.log(`A user has connected: ${socket.id}`);
        game.addPlayer(socket.id);
        
        socket.on('disconnect', () => {
            console.log(`A user has disconnected: ${socket.id}`);
            game.removePlayer(socket.id);
        });

        socket.on('input', (data) => {
            game.getPlayer(socket.id).updateKeys(data.pressed, data.key);
            console.log(game.getPlayer(socket.id).keyboard);
        });
    });
}

module.exports = handleSockets;