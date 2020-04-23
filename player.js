var Keyboard = require('./keyboard');
var Vector = require('./vector');

class Player {

    constructor(socket) {
        this.socket = socket;
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

    applyForce(force) {
        this.acc.add(force);
    }

    update(dt) {
        const movementSpeed = 100;
        for (let key of this.keyboard.getKeysPressed()) {
            switch (key) {
                case 'w':
                    this.applyForce(new Vector(0, -movementSpeed));
                    break;
                case 'a':
                    this.applyForce(new Vector(-movementSpeed, 0));
                    break;
                case 's':
                    this.applyForce(new Vector(0, movementSpeed));
                    break;
                case 'd':
                    this.applyForce(new Vector(movementSpeed, 0));
                    break;
                default:
                    break;
            }
        }

        this.vel.add(Vector.Mult(this.acc, dt));
        this.pos.add(Vector.Mult(this.vel, dt));
        this.acc.mult(0);
        this.vel.mult(0.99);
    }

}

module.exports = Player;