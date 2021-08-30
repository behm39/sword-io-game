class StateHandler {
    constructor() {
        this.gameUpdates = [];
        this.firstServerTimestamp = -1;
        this.gameStart = -1;

        StateHandler.RENDER_DELAY = 100; // in milliseconds
    }

    addUpdate(t, me, others) {
        if (this.firstServerTimestamp < 0) {
            this.firstServerTimestamp = t;
            this.gameStart = Date.now();
        }
        this.gameUpdates.push({
            t: t,
            me: me,
            others: others
        });

        const base = this._getBaseUpdate();
        if (base > 0) {
            this.gameUpdates.splice(0, base);
        }
    }

    _currentServerTime() {
        return this.firstServerTimestamp + (Date.now() - this.gameStart) - StateHandler.RENDER_DELAY;
    }

    _getBaseUpdate() {
        const serverTime = this._currentServerTime();
        for (let i = this.gameUpdates.length - 1; i >= 0; i--) {
            if (this.gameUpdates[i].t <= serverTime) {
                return i;
            }
        }
        return -1;
    }

    getCurrentState() {
        if (this.firstServerTimestamp < 0) {
            return {};
        }

        const base = this._getBaseUpdate();
        const serverTime = this._currentServerTime();

        if (base < 0) {
            return this.gameUpdates[this.gameUpdates.length - 1];
        } else if (base == this.gameUpdates.length - 1) {
            return this.gameUpdates[base];
        } else {
            const baseUpdate = this.gameUpdates[base];
            const next = this.gameUpdates[base + 1];
            const r = (serverTime - baseUpdate.t) / (next.t - baseUpdate.t);
            return {
                me: this._interpolateObject(baseUpdate.me, next.me, r),
                others: this._interpolateObjectArray(baseUpdate.others, next.others, r)
            }
        }
    }

    _interpolateObject(object1, object2, ratio) {
        if (!object2) {
            return object1;
        }

        const interpolated = {};
        Object.keys(object1).forEach(key => {
            if (key === 'direction') {
                interpolated[key] = interpolateDirection(object1[key], object2[key], ratio);
            } else {
                interpolated[key] = object1[key] + (object2[key] - object1[key]) * ratio;
            }
        });
        return interpolated;
    }

    _interpolateObjectArray(objects1, objects2, ratio) {
        return objects1.map(o => this._interpolateObject(o, objects2.find(o2 => o.id === o2.id), ratio));
    }

}

