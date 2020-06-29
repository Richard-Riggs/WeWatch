//======================= MODULES =======================
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

//===================== SERVER SETUP ====================
const app = express();
const http = require('http').createServer(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//===================== ROUTES ===========================
app.get('/', (req, res) => res.send('Hello from backend'));
app.use('/api/movies', require('./routes/movies'));

// ================== VOTING SESSIONS ====================
const io = require('socket.io')(http);
const vote = require('./routes/vote');
const voteSockets = vote.sockets(io);
app.use('/api/vote', vote.router);

//===================== START SERVER ====================
const port = 3001;
http.listen(port, () => console.log(`WeWatch server listening on port ${port} `));
