const axios = require('axios');
const rax = require('retry-axios');
const interceptorId = rax.attach();

// Input query type (discover, search, or trending) and parameters (JSON format)
// Return array of TMDb movie objects
exports.getMovies = async (queryType, queryParams) => {
	const url = `https://api.themoviedb.org/3/${queryType}/movie${queryParams.hasOwnProperty('trendTime')
		? '/' + queryParams.trendTime
		: ''}`;
	delete queryParams.trendTime;
	try {
		const movies = await axios.get(url, {
			params: {
				api_key: process.env.TMDB_KEY,
				...queryParams
			},
			raxConfig: {
				retry: 3,
				noResponseRetries: 3,
				retryDelay: 100,
				httpMethodsToRetry: [ 'GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT' ],
				statusCodesToRetry: [ [ 100, 199 ], [ 401, 429 ], [ 500, 599 ] ]
			}
		});
		return { totalPages: movies.data.total_pages, movies: movies.data.results };
	} catch (error) {
		console.log(error);
	}
};

// Input array of TMDb movie objects
// Return array of TMDb movie objects with IMDb IDs
exports.addImdbIds = async (movies) => {
	try {
		const updatedMovies = await Promise.all(
			movies.map(async (movie) => {
				const response = await axios.get(
					`https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=${process.env.TMDB_KEY}`,
					{
						raxConfig: {
							retry: 3,
							noResponseRetries: 3,
							retryDelay: 100,
							httpMethodsToRetry: [ 'GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT' ],
							statusCodesToRetry: [ [ 100, 199 ], [ 401, 429 ], [ 500, 599 ] ]
						}
					}
				);
				const updatedMovie = { ...movie, imdb_id: response.data.imdb_id };
				return updatedMovie;
			})
		);
		return updatedMovies;
	} catch (error) {
		console.log(error);
	}
};

// Input array of TMDb movie objects with IMDb IDs
// Returns array of TMDb movie objects with additional OMDb data
exports.addOmdbData = async (movies) => {
	try {
		const updatedMovies = await Promise.all(
			movies.map(async (movie) => {
				const response = await axios.get('http://www.omdbapi.com/', {
					params: {
						apikey: process.env.OMDB_KEY,
						i: movie.imdb_id
					},
					raxConfig: {
						retry: 3,
						noResponseRetries: 3,
						retryDelay: 100,
						httpMethodsToRetry: [ 'GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT' ],
						statusCodesToRetry: [ [ 100, 199 ], [ 401, 429 ], [ 500, 599 ] ]
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
	} catch (error) {
		console.log(error);
	}
};

// Input array of TMDb movie objects with additional OMDb data
// Returns filtered array of TMDb movie objects (excludes movies without ratings data)
exports.filterResults = (movies) => movies.filter((m) => m.ratings && m.ratings.length);
