class Keyboard {
    constructor() {
        this.keysPressed = new Set();
    }

    getKeysPressed() {
        return this.keysPressed;
    }

    pressKey(key) {
        this.keysPressed.add(key);
    }

    releaseKey(key) {
        this.keysPressed.delete(key);
    }

}

module.exports = Keyboard;