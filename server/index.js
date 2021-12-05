// @ts-check

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { VoteSocketController } = require('./sockets/VoteSocketController');

/**
 * Configure server
 */
const app = express();
const httpServer = require('http').createServer(app);
app.use(express.static('../client/build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Routes
 */
app.use('/api/movies', require('./routes/movies'));
app.use('/api/votes', require('./routes/votes'));
app.get('/*', (req, res) => res.sendFile(path.resolve('../client/build/index.html')));

/**
 * Sockets
 */
const socketServer = require('socket.io')(httpServer);
VoteSocketController.handleNamespace(socketServer, '/vote');

/**
 * Start server
 */
const port = process.env.PORT || 8080;
httpServer.listen(port, () => console.log(`WeWatch server listening on port ${port} `));
