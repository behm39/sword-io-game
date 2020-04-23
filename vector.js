class Vector {

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Vector(this.x, this.y);
    }

    add(other) {
        this.x += other.x;
        this.y += other.y;
    }

    sub(other) {
        this.x -= other.x;
        this.y -= other.y;
    }

    mult(c) {
        this.x *= c;
        this.y *= c;
    }

    getMagSq() {
        return this.x * this.x + this.y * this.y;
    }

    getMag() {
        return Math.sqrt(this.getMagSq());
    }

    normalize() {
        let mag = this.getMag();
        this.x /= mag;
        this.y /= mag;
    }

}

module.exports = Vector;