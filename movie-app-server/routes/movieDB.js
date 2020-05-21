const express = require('express');
const router = express.Router();
const movieUtils = require('../utils').movieUtils;
const axios = require('axios');

const url = 'https://api.themoviedb.org/3/discover/movie';

router.get('/', async (req, res) => {
	const tmdbMovies = await movieUtils.discoverMovies(req.query);
	const imdbMovies = await movieUtils.addImdbIds(tmdbMovies);
	const omdbbMovies = await movieUtils.addOmdbData(imdbMovies);
	res.json(omdbbMovies);
});

module.exports = router;
