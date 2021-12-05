// @ts-check

const router = require('express').Router();
const movieUtils = require('../utils').movieUtils;

router.get('/:queryType', async (req, res) => {
	const { totalPages, movies } = await movieUtils.getMovies(req.params.queryType, req.query);
	const imdbMovies = await movieUtils.addImdbIds(movies);
	const omdbMovies = await movieUtils.addOmdbData(imdbMovies);
	if (req.params.queryType === 'discover')
		res.json({
			totalPages,
			movies: movieUtils.filterResults(omdbMovies)
		});
	else
		res.json({
			totalPages,
			movies: omdbMovies
		});
});

module.exports = router;
