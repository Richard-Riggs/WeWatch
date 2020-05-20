const express = require('express');
const axios = require('axios');
const router = express.Router();

// const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env
// 	.TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2019`;

// const url =
// https://api.themoviedb.org/3/discover/movie?
// api_key=${process.env.TMDB_KEY}&
// language=en-US&
// sort_by=popularity.desc&
// include_adult=false&
// include_video=false&
// page=1&
// primary_release_year=2019`;

const url = 'https://api.themoviedb.org/3/discover/movie';

router.get('/', async (req, res) => {
	const queries = req.query;
	const movies = await axios.get(url, {
		params: {
			api_key: process.env.TMDB_KEY,
			...queries
		}
	});
	res.json(movies.data);
});

module.exports = router;
