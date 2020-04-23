

function handleSockets(io, game) {
    io.on('connection', (socket) => {
        console.log(`A user has connected: ${socket.id}`);
        game.addPlayer(socket.id);
        
        socket.on('disconnect', () => {
            clearInterval(intervalId);
            console.log(`A user has disconnected: ${socket.id}`);
            game.removePlayer(socket.id);
        });

        socket.on('input', (data) => {
            game.getPlayer(socket.id).updateKeys(data.pressed, data.key);
            console.log(game.getPlayer(socket.id).keyboard);
        });

        var intervalId = setInterval(() => {
            let pos = game.getPlayer(socket.id).pos;
            socket.emit('heartbeat', {
                t: Date.now(),
                me: {x: pos.x, y: pos.y},
                others: []
            });
        }, 33);
    });
}

module.exports = handleSockets;