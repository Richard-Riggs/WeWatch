// @ts-check

//======================= MODULES =======================
const express = require('express');
const router = express.Router();
const voteService = require('../services/votes/voteService');

//======================= ROUTES =======================
router.post('/', (req, res) => {
	const session = voteService.createNewSession(req.body.movieList, req.body.clientId);
	res.status(201).json({ sessionId: session.id });
});

router.delete('/:sessionId', (req, res) => {
	voteService.deleteSession(req.params.sessionId);
});

module.exports = router;
