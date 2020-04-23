class StateHandler {
    constructor() {
        this.gameUpdates = [];
    }

    addUpdate(t, me, others) {
        this.gameUpdates.push({
            t: t,
            me: me,
            others: others
        });
    }

    getCurrentState() {
        if (this.gameUpdates.length > 1) {
            this.gameUpdates.splice(0, this.gameUpdates.length - 1);
        }
        return this.gameUpdates[this.gameUpdates.length - 1];
    }
}

