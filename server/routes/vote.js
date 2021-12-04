// @ts-check

//======================= MODULES =======================
const express = require('express');
const router = express.Router();
const voteService = require('../services/votes/voteService');
const socketUtil = require('../utils/socketUtils');

//==================== SESSION DATA =====================
const sessions = [];

//======================= SOCKETS =======================
exports.sockets = (io) => {
	const vote = io.of('/vote');
	vote.on('connection', (socket) => {
		const { sessionId, clientId } = socket.handshake.query;
		const session = voteService.getSession(sessionId);
		//const sessionData = sessions.find((s) => s.id === sessionId);

		if (session && !session.clientIsConnected(clientId)) {
			socket.join(sessionId);
			session.addClient(clientId);

			if (session.leaderId === clientId) {
				socket.emit('userIsLeader', true);
			}

			socket.emit('loadSessionData', session.getData());
			vote.to(sessionId).emit('updateUserCount', session.clients.length);

			socket.on('startVote', (startVote) => {
				if (session.leaderId === clientId) {
					session.stage = 'vote';
					vote.to(sessionId).emit('startVote', { startVote: startVote, stage: session.stage });
				}
			});

			socket.on('submitVote', (selectedMovies) => {
				if (!session.clientHasVoted(clientId)) {
					session.submitClientVotes(clientId, selectedMovies);

					// Triggers if votes have been received from all clients
					if (session.allClientsVoted) {
						session.processResults();
						vote.to(sessionId).emit('loadSessionData', session.getData());
					}
				}
			});

			socket.on('disconnect', () => {
				session.removeClient(clientId);
				vote.to(sessionId).emit('updateUserCount', session.clients.length);				

				// Terminates voting session if leader disconnects without emitting 'terminate'
				if (clientId === session.leaderId) {
					setTimeout(() => {
						// Check if leader hasn't reconnected within 5 seconds.
						if (!session.clientIsConnected(clientId)) {
							socketUtil.deleteRoom(vote, sessionId, 'terminate');
							voteService.deleteSession(sessionId);
						}
					}, 5000);
				}
			});

			socket.on('terminate', () => {
				if (clientId === session.leaderId) {
					socketUtil.deleteRoom(vote, sessionId, 'terminate');
					voteService.deleteSession(sessionId);
				};
			});
		} else if (session) {
			socket.emit('loadSessionData', { error: 'Your web browser is already connected to this voting lobby.' });
		} else {
			socket.emit('loadSessionData', { error: 'Voting session does not exist.' });
		}
	});
};

//======================= ROUTES =======================
router.post('/', (req, res) => {
	const session = voteService.createNewSession(req.body.movieList, req.body.clientId);
	res.status(201).json({ sessionId: session.id });
});

router.delete('/:sessionId', (req, res) => {
	voteService.deleteSession(req.params.sessionId);
});

exports.router = router;
