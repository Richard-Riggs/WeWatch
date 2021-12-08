// @ts-check

const short = require('short-uuid');


/**
 * @property {string} id
 * @property {{[key: string]: any}} clients
 */
 class VoteSessionService {

    constructor(movieList, leaderId) {
        this.id = short.generate();
        this.movieList = movieList;
        this.leaderId = leaderId;
        this.clients = {};
        this.movieVotes = [];
        this.stage = 'lobby';
        this.results = {};
    }

    get clientCount() {
        return Object.entries(this.clients).length;
    }

    get voteLimit() {
        const listLength = this.movieList.movies.length;
        return listLength >= 10 ? 5 : Math.ceil(listLength / 2);
    }

    get votedClients() {
        return Object.values(this.clients).filter(c => c.voted).map(c => c.id);
    }

    get votedClientCount() {
        return this.votedClients.length;
    }

    get allClientsVoted() {
        const clientCount = Object.keys(this.clients).length;
        return clientCount && clientCount === this.votedClientCount;
    }

    clientIsConnected(clientId) {
        return this.clients.hasOwnProperty(clientId);
    }

    clientHasVoted(clientId) {
        const client = this.clients[clientId]
        return client && client.voted;
    }

    addClient(clientId) {
        this.clients[clientId] = {
            id: clientId,
            voted: false
        };
    }

    removeClient(clientId) {
        delete this.clients[clientId];
    }

    getData() {
        return {
            id: this.id,
            movieList: this.movieList,
            voteLimit: this.voteLimit,
            leaderId: this.leaderId,
            clients: Object.keys(this.clients),
            votedClients: this.votedClients,
            movieVotes: this.movieVotes,
            stage: this.stage,
            results: this.results
        };
    }

    submitClientVotes(clientId, selectedMovies) {
        this.movieVotes.push(...selectedMovies);
        this.clients[clientId].voted = true;
    }

    determineVoteWinner() {
        let winners = [];
        let runningTally = {};
        let highVotes = 0;

        for (const movieVote of this.movieVotes) {
            if (!runningTally.hasOwnProperty(movieVote.id)) {
                runningTally[movieVote.id] = 0;
            }

            runningTally[movieVote.id]++;

            if (runningTally[movieVote.id] > highVotes) {
                highVotes = runningTally[movieVote.id];
                winners = [ movieVote ];
            } else if (runningTally[movieVote.id] === highVotes) {
                winners.push(movieVote);
            }
        }

        this.results = { highVotes, winners };
    }

    stageRevote() {
        this.movieList.movies = [ ...this.results.winners ];
        this.movieVotes = [];
        this.stage = 'revote';
        this.results = {};

        for (const client of Object.values(this.clients)) {
            client.voted = false;
        }
    }

    revoteNeeded() {
        const staleMate = this.results.winners.length === this.movieList.movies.length;
        return this.results.winners.length > 1 && !staleMate;
    }

    processResults() {
        this.determineVoteWinner();
        if (this.revoteNeeded()) {
            this.stageRevote();
        } else {
            this.stage = 'results';
        }

        return this.results;
    }

}

module.exports = { VoteSessionService };
