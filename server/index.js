// @ts-check

/**
 * Modules
 */
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const socketIO = require('socket.io');
const movieRouter = require('./routes/movies');
const voteRouter = require('./routes/vote');

/**
 * Server setup
 */
const app = express();
const httpServer = http.createServer(app);

app.use(express.static('./dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use('/api/movies', movieRouter);
app.get('/*', (req, res) => res.sendFile('dist/index.html', { root: '.' }));

// ================== VOTING SESSIONS ====================
const socketServer = socketIO(http);
const voteSockets = voteRouter.sockets(socketServer);
app.use('/api/vote', voteRouter.router);

//===================== START SERVER ====================
const port = process.env.PORT || 8080;
httpServer.listen(port, () => console.log(`WeWatch server listening on port ${port} `));
