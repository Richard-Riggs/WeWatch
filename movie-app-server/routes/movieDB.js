const express = require('express');
const router = express.Router();
const movieUtils = require('../utils').movieUtils;

router.get('/:queryType', async (req, res) => {
	const tmdbMovies = await movieUtils.getMovies(req.params.queryType, req.query);
	const imdbMovies = await movieUtils.addImdbIds(tmdbMovies);
	const omdbMovies = await movieUtils.addOmdbData(imdbMovies);
	res.json(omdbMovies);
});

module.exports = router;
