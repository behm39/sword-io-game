var Keyboard = require('./keyboard');

class Player {

    constructor(id) {
        this.id = id;
        this.keyboard = new Keyboard();
    }

    updateKeys(pressed, key) {
        if (pressed) {
            this.keyboard.pressKey(key);
        } else {
            this.keyboard.releaseKey(key);
        }
    }

    update() {
        
    }

}

module.exports = Player;