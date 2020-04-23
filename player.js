var Keyboard = require('./keyboard');
var Vector = require('./vector');

class Player {

    constructor(id) {
        this.id = id;
        this.keyboard = new Keyboard();
        this.pos = new Vector(Math.random() * 600, Math.random() * 600);
        this.vel = new Vector();
        this.acc = new Vector();
    }

    updateKeys(pressed, key) {
        if (pressed) {
            this.keyboard.pressKey(key);
        } else {
            this.keyboard.releaseKey(key);
        }
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

}

module.exports = Player;