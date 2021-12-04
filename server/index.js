//======================= MODULES =======================
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//===================== SERVER SETUP ====================
const app = express();
const http = require('http').createServer(app);
app.use(express.static('../client/build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//===================== ROUTES ===========================
app.use('/api/movies', require('./routes/movies'));
app.get('/*', (req, res) => res.sendFile(path.resolve('../client/build/index.html')));

// ================== VOTING SESSIONS ====================
const io = require('socket.io')(http);
const vote = require('./routes/vote');
const voteSockets = vote.sockets(io);
app.use('/api/vote', vote.router);

//===================== START SERVER ====================
const port = process.env.PORT || 8080;
http.listen(port, () => console.log(`WeWatch server listening on port ${port} `));
