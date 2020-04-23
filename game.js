var Player = require('./player');

class Game {

    constructor() {
        this.players = new Map();
        this.lastUpdateTime = Date.now();
        setInterval(this.update.bind(this), 1000 / 60);
    }

    addPlayer(socketId) {
        this.players.set(socketId, new Player(socketId));
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
    }

}

module.exports = Game;