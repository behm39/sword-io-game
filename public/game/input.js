function keyPressed() {
    let key = null;
    switch (keyCode) {
        case 87:
            // W
            key = 'w';
            break;
        case 65:
            // A
            key = 'a';
            break;
        case 83:
            // S 
            key = 's';
            break;
        case 68:
            // D
            key = 'd';
            break;
        default:
            break;
    }
    socket.emit('input', { pressed: true, key: key });
}

function keyReleased() {
    let key = null;
    switch (keyCode) {
        case 87:
            // W
            key = 'w';
            break;
        case 65:
            // A
            key = 'a';
            break;
        case 83:
            // S 
            key = 's';
            break;
        case 68:
            // D
            key = 'd';
            break;
        default:
            break;
    }
    socket.emit('input', { pressed: false, key: key });
}