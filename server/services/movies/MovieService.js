// @ts-check

const config = require('../../config.json');
const axios = require('axios');
const rax = require('retry-axios');
rax.attach();


class MovieService {

    async fetchData(url, params) {
        try {
            return await axios.get(url, {
                params: params,
                raxConfig: config.externalAPIs.retryConfig 
            });
        } catch(e) {
            return e.response;
        }
    }

    async getMovies(mode, value, page) {
        const url = `${config.externalAPIs.tmdb.baseUrl}/${mode}/movie`;
        const params = mode === 'discover'
            ? this.getDiscoverParams(value, page)
            : this.getSearchParams(value, page);

        const response = await this.fetchData(url, params);
        if (response.status < 200 || response.status >= 300) {
            return {
                apiStatusCode: response.status,
                error: response.data.status_message
            };
        }

        let movies = response.data.results;
        await this.addIMDbIds(movies);
        await this.addOMDbData(movies);

        if (movies.every(e => e.error)) {
            return {
                apiStatusCode: movies[0].errorStatus,
                error: movies[0].error
            }
        }

        movies = movies.filter(m => (!m.error));
        if (mode === 'discover') {
            movies = movies.filter(m => m.ratings && m.ratings.length);
        }

        return { movies, totalPages: response.data.total_pages};
    }

    getDiscoverParams(genreId, page) {
        return {
            with_genres: genreId,
            page,
            api_key: process.env.TMDB_KEY,
            ...config.externalAPIs.tmdb.discoverParams
        }
    }

    getSearchParams(searchText, page) {
        return {
            query: searchText,
            page,
            api_key: process.env.TMDB_KEY,
            ...config.externalAPIs.tmdb.searchParams
        };
    }

    async addIMDbIds(movies) {
		await Promise.all(
			movies.map(async (movie) => {
                const url = `${config.externalAPIs.tmdb.baseUrl}/movie/${movie.id}/external_ids`;
                const { data, status } = await this.fetchData(url, { api_key: process.env.TMDB_KEY + "12345" });
                if (data.hasOwnProperty('success') && !data.success) {
                    movie.error = data.status_message;
                    movie.errorStatus = status;
                    movie.imdb_id = null;
                } else {
                    movie.imdb_id = data.imdb_id;
                }
			})
		);
    }

    async addOMDbData(movies) {
        await Promise.all(
			movies.map(async (movie) => {
                if (movie.error || !movie.imdb_id) return;
                const url = config.externalAPIs.omdb.baseUrl;
                const params = { apikey: process.env.OMDB_KEY, i: movie.imdb_id};
                const { data, status } = await this.fetchData(url, params);

                if (data.Error) {
                    movie.error = data.error;
                    movie.errorStatus = status;
                    return;
                }

                movie.runtime = data.Runtime;
                movie.ratings = data.Ratings;
                movie.genre = data.Genre;
                movie.director = data.Director;
                movie.writer = data.Writer;
                movie.actors = data.Actors;
                movie.list_id = "";
			})
		);
    }

}

const service = new MovieService();
module.exports = service;
