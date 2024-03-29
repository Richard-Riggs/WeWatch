// @ts-check

import axios from 'axios';
import config from '../constants/api';


export default class MoviesAPI {

    constructor() {
        this.baseUrl = config.wewatch_api.movies.base_url;
    }

    static async fetchMovies(queryType, queryValue, page) {
        const api = new MoviesAPI();
        try {
            const response = await axios.get(api.baseUrl, {
                params: {
                    mode: queryType,
                    value: queryValue,
                    page: page
                }
            });
            return response.data;
        } catch (e) {
            return {
                error: e.response.data.error ?? "An error occurred when calling the movies API.",
                movies: [],
                totalPages: 0
            };
        }
    }
}
