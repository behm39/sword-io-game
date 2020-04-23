var socket = io();
var stateHandler;

function setup() {
    stateHandler = new StateHandler();
    createCanvas(600, 600);
}

function draw() {
    let state = stateHandler.getCurrentState();
    

    background(201);
    renderPlayer(state.me, true);
    for (let i = 0; i < state.others.length; i++) {
        renderPlayer(state.others[i]);
    }

}

function renderPlayer(player, thisPlayer=false) {
    stroke(0);
    thisPlayer ? fill(255) : fill(0);
    ellipse(player.x, player.y, 32);
}

socket.on('heartbeat', (data) => {
    stateHandler.addUpdate(data.t, data.me, data.others);
}); 