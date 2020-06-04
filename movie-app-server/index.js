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
	const clientId = socket.handshake.query.clientId;
	const sessionData = sessions.find((s) => s.id === sessionId);

	const updateUserCount = (sessionId) => {
		vote.to(sessionId).emit('updateUserCount', sessionData.clients.length);
	};

	const getVoteWinner = (movieVotes) => {
		const voteReducer = (voteMap, movieVote) => voteMap.set(movieVote.id, (voteMap.get(movieVote.id) || 0) + 1);
		const resultsMap = movieVotes.reduce(voteReducer, new Map());
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

	if (sessionData && !sessionData.clients.includes(clientId)) {
		socket.join(sessionId);
		sessionData.clients.push(clientId);
		console.log(sessionData.clients);

		if (sessionData.leaderId === clientId) {
			socket.emit('userIsLeader', true);
		}

		socket.emit('loadMovies', sessionData);
		updateUserCount(sessionId);

		socket.on('startVote', (startVote) => {
			if (sessionData.leaderId === clientId) {
				sessionData.stage = 'vote';
				vote.to(sessionId).emit('startVote', { startVote: startVote, stage: sessionData.stage });
			}
		});

		socket.on('submitVote', (selectedMovies) => {
			if (!sessionData.votedClients.includes(clientId)) {
				sessionData.movieVotes.push(...selectedMovies);
				sessionData.votedClients.push(clientId);

				// Triggers if votes have been received from all clients
				if (sessionData.clients.length === sessionData.votedClients.length) {
					const results = getVoteWinner(sessionData.movieVotes);

					// Triggers tiebreaker if there are 2 or more winners
					// An equal tie between all movies results in a stalemate, which completes the vote
					// (Else the exact same list would be voted on again)
					if (results.winners.length > 1 && results.winners.length < sessionData.movieList.movies.length) {
						sessionData.movieList.movies = [ ...results.winners ];
						sessionData.voteLimit = getVoteLimit(sessionData.movieList.movies.length);
						sessionData.movieVotes = [];
						sessionData.votedClients = [];
						vote.to(sessionId).emit('loadMovies', sessionData);
					} else {
						vote.to(sessionId).emit('voteComplete', results);
					}
				}
			}
		});

		socket.on('disconnect', () => {
			sessionData.clients = [ ...sessionData.clients.filter((c) => c !== clientId) ];
			updateUserCount(sessionId);
		});
	} else if (sessionData) {
		socket.emit('loadMovies', { error: 'Your web browser is already connected to this voting lobby.' });
	} else {
		socket.emit('loadMovies', { error: 'Invalid Session URL.' });
	}
});

app.post('/api/vote', (req, res) => {
	const session = {
		id: short.generate(),
		movieList: { ...req.body.movieList },
		voteLimit: getVoteLimit(req.body.movieList.movies.length),
		leaderId: req.body.clientId,
		clients: [],
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
