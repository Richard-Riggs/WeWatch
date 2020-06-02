//======================= MODULES =======================

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const short = require('short-uuid');

//===================== SERVER SETUP ====================

const app = express();
const http = require('http').createServer(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//===================== ROUTES ====================

app.get('/', (req, res) => res.send('Hello from backend'));
app.use('/api/movieDB', require('./routes/movieDB'));

// ===================== SOCKET IO SESSIONS ====================

const io = require('socket.io')(http);
const sessions = [];
const vote = io.of('/vote');

vote.on('connection', (socket) => {
	const sessionId = socket.handshake.query.sessionId;
	const sessionData = sessions.find((s) => s.id === sessionId);
	const updateUserCount = (sessionId) => {
		vote.in(sessionId).clients((err, clients) => {
			if (err) console.log(err);
			vote.to(sessionId).emit('updateUserCount', clients.length);
		});
	};

	// client ID: socket.client.nsps['/vote'].id
	if (sessionData) {
		console.log(socket.client.nsps['/vote'].conn.id);
		socket.join(sessionId);

		if (!sessionData.leaderId) {
			sessionData.leaderId = socket.client.nsps['/vote'].conn.id;
			socket.emit('userIsLeader', true);
		}

		socket.emit('loadMovies', sessionData);
		updateUserCount(sessionId);

		socket.on('disconnect', () => {
			console.log('user disconnected');
			updateUserCount(sessionId);
		});
	} else {
		socket.emit('loadMovies', { error: 'Invalid Session URL.' });
	}
});

app.post('/vote', (req, res) => {
	const session = {
		id: short.generate(),
		movieList: { ...req.body.movieList },
		leaderId: '',
		clients: []
	};
	sessions.push(session);
	res.status(201).json({ sessionId: session.id });
});

//===================== START SERVER ====================

const port = 3001;
http.listen(port, () => console.log(`Movie App backend server listening on port ${port} `));
