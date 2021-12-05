// @ts-check

import axios from 'axios';
import config from '../constants/api.config';


export class MoviesAPI {

    constructor() {
        this.baseUrl = config.wewatch_api.movies.base_url;
    }

    static async fetchMovies(queryType, queryValue, page) {
        const api = new MoviesAPI();
        try {
            const response = await axios.get(api.baseUrl, {
                params: {
                    type: queryType,
                    value: queryValue,
                    page: page
                }
            });
            debugger;
        } catch {
            return [];
        }
    }
}
