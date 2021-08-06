const express = require('express');
const app = express();
const { syncAndSeed } = require('./db');
const routes = require('./routes/routes');


app.get('/', (req, res) => {
    res.send('Hi');
});

app.use('/api', routes)

const init = async () => {
    await syncAndSeed();
    app.listen(3000);
}
init();

