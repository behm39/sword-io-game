var app = require('express')();

const port = 3000 || process.env.PORT;

app.get('/', (req, res) => {
    res.send("Hello, World!");
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
