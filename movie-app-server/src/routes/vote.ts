//======================= MODULES =======================
import express from 'express';
import short from 'short-uuid';
import { Server } from 'socket.io';
const utils = require('../utils').voteUtils;

//==================== SESSION DATA =====================
const sessions: any[] = [];

//======================= SOCKETS =======================
const sockets = (io: Server) => {
	const vote = io.of('/vote');
	vote.on('connection', (socket) => {
		const sessionId = socket.handshake.query.sessionId as string; // TODO: fix type
		const clientId = socket.handshake.query.clientId;
		const sessionData = sessions.find((s) => s.id === sessionId);

		if (sessionData && !sessionData.clients.includes(clientId)) {
			socket.join(sessionId);
			sessionData.clients.push(clientId);

			if (sessionData.leaderId === clientId) {
				socket.emit('userIsLeader', true);
			}

			socket.emit('loadSessionData', sessionData);
			utils.updateUserCount(vote, sessionData);

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
						const results = utils.getVoteWinner(sessionData.movieVotes);

						// Triggers tiebreaker if there are 2 or more winners
						// An equal tie between all movies results in a stalemate, which completes the vote
						// (Else the exact same list would be voted on again)
						if (
							results.winners.length > 1 &&
							results.winners.length < sessionData.movieList.movies.length
						) {
							sessionData.movieList.movies = [ ...results.winners ];
							sessionData.voteLimit = utils.getVoteLimit(sessionData.movieList.movies.length);
							sessionData.movieVotes = [];
							sessionData.votedClients = [];
							sessionData.stage = 'revote';
							vote.to(sessionId).emit('loadSessionData', sessionData);
						} else {
							sessionData.results = results;
							sessionData.stage = 'results';
							vote.to(sessionId).emit('loadSessionData', sessionData);
						}
					}
				}
			});

			socket.on('disconnect', () => {
				sessionData.clients = [ ...sessionData.clients.filter((c: any) => c !== clientId) ]; // TODO: fix type
				utils.updateUserCount(vote, sessionData);

				// Terminates voting session if leader disconnects without emitting 'terminate'
				if (clientId === sessionData.leaderId)
					setTimeout(() => {
						if (!sessionData.clients.includes(clientId)) {
							utils.terminateSession(sessions, vote, sessionId);
						}
					}, 5000);
			});

			socket.on('terminate', () => {
				if (clientId === sessionData.leaderId) utils.terminateSession(sessions, vote, sessionId);
			});
		} else if (sessionData) {
			socket.emit('loadSessionData', { error: 'Your web browser is already connected to this voting lobby.' });
		} else {
			socket.emit('loadSessionData', { error: 'Voting session does not exist.' });
		}
	});
};

//======================= ROUTES =======================
const router = express.Router();
router.post('/', (req, res) => {
	const session = {
		id: short.generate(),
		movieList: { ...req.body.movieList },
		voteLimit: utils.getVoteLimit(req.body.movieList.movies.length),
		leaderId: req.body.clientId,
		clients: [],
		votedClients: [],
		movieVotes: [],
		stage: 'lobby',
		results: {}
	};
	sessions.push(session);
	res.status(201).json({ sessionId: session.id });
});

router.delete('/:sessionId', (req, res) => {
	utils.deleteSession(sessions, req.params.sessionId);
});

export default {sockets, router};
