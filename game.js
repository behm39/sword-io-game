var Player = require('./player');

class Game {

    constructor() {
        this.players = new Map();
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
        for (let playerPair of this.players) {
            playerPair[1].update();
        }
    }

}

module.exports = Game;