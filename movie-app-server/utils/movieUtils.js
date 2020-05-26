const axios = require('axios');

// Input query parameters in JSON format
// Return array of TMDb movie objects
exports.discoverMovies = async (queryParams) => {
	const url = 'https://api.themoviedb.org/3/discover/movie';
	const movies = await axios.get(url, {
		params: {
			api_key: process.env.TMDB_KEY,
			...queryParams
		}
	});
	return movies.data.results;
};

// Input array of TMDb movie objects
// Return array of TMDb movie objects with IMDb IDs
exports.addImdbIds = async (movies) => {
	const updatedMovies = await Promise.all(
		movies.map(async (movie) => {
			const response = await axios.get(
				`https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=${process.env.TMDB_KEY}`
			);
			const updatedMovie = { ...movie, imdb_id: response.data.imdb_id };
			return updatedMovie;
		})
	);
	return updatedMovies;
};

// Input array of TMDb movie objects with IMDb IDs
// Returns array of TMDb movie objects with additional OMDb data
exports.addOmdbData = async (movies) => {
	const updatedMovies = await Promise.all(
		movies.map(async (movie) => {
			const response = await axios.get('http://www.omdbapi.com/', {
				params: {
					apikey: process.env.OMDB_KEY,
					i: movie.imdb_id
				}
			});
			const { Runtime, Ratings, Genre, Director, Writer, Actors } = response.data;
			const updatedMovie = {
				...movie,
				runtime: Runtime,
				ratings: Ratings,
				genre: Genre,
				director: Director,
				writer: Writer,
				actors: Actors,
				list_id: ''
			};
			return updatedMovie;
		})
	);
	return updatedMovies;
};
