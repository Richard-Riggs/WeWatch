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

const getIMDbId = (tmdbId) =>
	axios.get(`https://api.themoviedb.org/3/movie/${tmdbId}/external_ids?api_key=${process.env.TMDB_KEY}`);

const addIMDbIds = async (movies) => {
	const updatedMovies = await Promise.all(
		movies.map(async (movie) => {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=${process.env.TMDB_KEY}`
			);
			const newMovie = { ...movie, imdb_id: response.data.imdb_id };
			return newMovie;
		})
	);
	return updatedMovies;
};

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
