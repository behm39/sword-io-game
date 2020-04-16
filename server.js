var express = require('express');
var app = express();

const port = 3000 || process.env.PORT;

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.send("Hello, World!");
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});

require('./sockets')();