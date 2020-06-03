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
const getVoteLimit = (listLength) => {
	return listLength >= 10 ? 5 : Math.ceil(listLength / 2);
};

vote.on('connection', (socket) => {
	const sessionId = socket.handshake.query.sessionId;
	const sessionData = sessions.find((s) => s.id === sessionId);

	const updateUserCount = (sessionId) => {
		vote.in(sessionId).clients((err, clients) => {
			if (err) console.log(err);
			vote.to(sessionId).emit('updateUserCount', clients.length);
		});
	};

	const getVoteWinner = (movieVotes) => {
		const voteReducer = (voteMap, movieVote) => voteMap.set(movieVote.id, (voteMap.get(movieVote.id) || 0) + 1);
		const resultsMap = movieVotes.reduce(voteReducer, new Map());
		console.log(' ');
		console.log('RESULTS MAP:');
		console.log(resultsMap.entries());
		const findWinner = (resultsMap) => {
			let highVotes = 0,
				winners = [];
			for (const [ movie, votes ] of resultsMap) {
				if (votes > highVotes) {
					highVotes = votes;
					winners = [ movie ];
				} else if (votes === highVotes) {
					winners.push(movie);
				}
			}
			return { highVotes, winners };
		};
		const results = findWinner(resultsMap);
		results.winners = results.winners.map((w) => movieVotes.find((mv) => mv.id === w));
		return results;
	};

	// client ID: socket.client.nsps['/vote'].id
	if (sessionData) {
		console.log(socket.client.id);
		socket.join(sessionId);

		if (!sessionData.leaderId) {
			sessionData.leaderId = socket.client.id;
			socket.emit('userIsLeader', true);
		}

		socket.emit('loadMovies', sessionData);
		updateUserCount(sessionId);

		socket.on('startVote', (startVote) => {
			if (sessionData.leaderId === socket.client.id) {
				sessionData.stage = 'vote';
				vote.to(sessionId).emit('startVote', { startVote: true, stage: sessionData.stage });
			}
		});

		socket.on('submitVote', (selectedMovies) => {
			if (!sessionData.votedClients.includes(socket.client.id)) {
				sessionData.movieVotes.push(...selectedMovies);
				sessionData.votedClients.push(socket.client.id);
				vote.in(sessionId).clients((err, clients) => {
					if (err) console.log(err);

					// Triggers if votes have been received from all clients
					if (clients.length === sessionData.votedClients.length) {
						const results = getVoteWinner(sessionData.movieVotes);
						if (results.winners.length > 1) {
							sessionData.movieList.movies = [ ...results.winners ];
							sessionData.voteLimit = getVoteLimit(sessionData.movieList.movies.length);
							sessionData.movieVotes = [];
							sessionData.votedClients = [];
							vote.to(sessionId).emit('loadMovies', sessionData);
						} else {
							vote.to(sessionId).emit('voteComplete', results);
						}
					}
				});
			}
		});

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
		voteLimit: getVoteLimit(req.body.movieList.movies.length),
		leaderId: '',
		votedClients: [],
		movieVotes: [],
		stage: 'lobby'
	};
	sessions.push(session);
	res.status(201).json({ sessionId: session.id });
});

//===================== START SERVER ====================

const port = 3001;
http.listen(port, () => console.log(`Movie App backend server listening on port ${port} `));
