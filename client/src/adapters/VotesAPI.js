// @ts-check

import axios from 'axios';
import config from '../constants/api.config';


export default class VotesAPI {

    constructor() {
        this.baseUrl = config.wewatch_api.votes.base_url;
    }

    static async createVoteSession(movieList, clientId) {
        const api = new VotesAPI();
        try {
            const response = await axios.post(api.baseUrl, {
                movieList: movieList,
                clientId: clientId
            });
            return response.data;
        } catch (e) {
            return e.response.data;
        }
    }

}
