const express = require('express');
const routes = require('./routes/index.js');

const cors = require('cors');
const port = process.env.PORT || 3333;
const app = express();

const bodyparser = require('body-parser');

const server = require('http').createServer(app);

app.use(bodyparser.json());
app.use(cors());

server.listen(port, () => {
    console.log('Server started at http://localhost:' + port +'/api/')
});

app.use('/api', routes);

module.exports = app;