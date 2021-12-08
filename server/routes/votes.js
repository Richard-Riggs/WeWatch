// @ts-check

const router = require('express').Router();
const voteService = require('../services/voteSessions/VoteSessionManager');

router.post('/', (req, res) => {
	if (!req.body.movieList || !req.body.clientId) {
		return res.status(400).send({ error: "MovieList or ClientId not specified." });
	}
	const session = voteService.createNewSession(req.body.movieList, req.body.clientId);
	res.status(201).json({ sessionId: session.id });
});

router.delete('/:sessionId', (req, res) => {
	voteService.deleteSession(req.params.sessionId);
});

module.exports = router;
