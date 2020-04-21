
function handleSockets(io) {
    io.on('connection', (socket) => {
        console.log(`A user has connected: ${socket.id}`);
        socket.on('disconnect', () => {
            console.log(`A user has disconnected: ${socket.id}`);
        });
    });
}

module.exports = handleSockets;