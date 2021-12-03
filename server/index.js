//======================= MODULES =======================
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

//===================== SERVER SETUP ====================
const app = express();
const http = require('http').createServer(app);
app.use(express.static('./dist'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//===================== ROUTES ===========================
app.use('/api/movies', require('./routes/movies'));
app.get('/*', (req, res) => res.sendFile('dist/index.html', { root: '.' }));

// ================== VOTING SESSIONS ====================
const io = require('socket.io')(http);
const vote = require('./routes/vote');
const voteSockets = vote.sockets(io);
app.use('/api/vote', vote.router);

//===================== START SERVER ====================
const port = process.env.PORT || 8080;
http.listen(port, () => console.log(`WeWatch server listening on port ${port} `));
