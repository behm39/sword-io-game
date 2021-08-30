var Player = require('./player');

class Game {

    constructor() {
        this.players = new Map();
        this.lastUpdateTime = Date.now();
        setInterval(this.update.bind(this), 1000 / 60);
    }

    addPlayer(socket) {
        this.players.set(socket.id, new Player(socket));
    }

    getPlayer(socketId) {
        return this.players.get(socketId);
    }

    removePlayer(socketId) {
        this.players.delete(socketId);
    }

    update() {
        const now = Date.now();
        const dt = (now - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = now;

        for (let playerPair of this.players) {
            playerPair[1].update(dt);
        }

        // send heartbeat to all players
        // TODO: optimize this, this is n^2 for n = number of players
        for (let playerPair of this.players) {
            let data = this._generateHeartbeatData(playerPair[1]);
            playerPair[1].socket.emit('heartbeat', data);
        }

    }

    _generateHeartbeatData(player) {
        // get socket from this player
        let socket = player.socket;

        // generate 'others' from list of players and this socket's ID
        let others = [];
        for (let candidate of this.players.values()) {
            if (candidate.socket !== socket) {
                others.push(candidate);
            }
        }
        others;

        let data = {
            t: Date.now(),
            me: {
                id: player.socket.id,
                x: player.pos.x,
                y: player.pos.y
            },
            others: []
        };
        for (let other of others) {
            data.others.push({
                id: other.socket.id,
                x: other.pos.x,
                y: other.pos.y
            });
        }
        return data;
    }

}

module.exports = Game;