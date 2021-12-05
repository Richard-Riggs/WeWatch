// @ts-check

//======================= MODULES =======================
const express = require('express');
const router = express.Router();
const voteService = require('../services/votes/voteService');
const { VoteSocketController } = require('../sockets/VoteSocketController');

//======================= SOCKETS =======================
exports.sockets = (io) => VoteSocketController.handleNamespace(io, '/vote');

//======================= ROUTES =======================
router.post('/', (req, res) => {
	const session = voteService.createNewSession(req.body.movieList, req.body.clientId);
	res.status(201).json({ sessionId: session.id });
});

router.delete('/:sessionId', (req, res) => {
	voteService.deleteSession(req.params.sessionId);
});

exports.router = router;
