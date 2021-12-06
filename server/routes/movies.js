// @ts-check

const router = require('express').Router();
const movieService = require('../services/movies/MovieService');
const movieUtils = require('../utils').movieUtils;

router.get('/', async (req, res) => {
	let { mode, value, page } = req.query;
	value = value.toString();

	if (mode !== 'discover' && mode !== 'search') {
		return res.status(400).send({ error: "Invalid mode." });
	} else if (!page) {
		return res.status(400).send({ error: "No page specified." });
	}

	let moviesData = await movieService.getMovies(mode, value, page);

	if (moviesData.error) {
		return res.status(moviesData.apiStatusCode).send({ error: moviesData.error });
	}

	return res.json(moviesData);
});

module.exports = router;
