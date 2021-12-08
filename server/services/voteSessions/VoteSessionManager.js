// @ts-check

const { VoteSession } = require('./VoteSession');


class VoteSessionManager {

    constructor() {
        this.sessions = {};
    }

    createNewSession(movieList, leaderId) {
        const newSession = new VoteSession(movieList, leaderId);
        this.sessions[newSession.id] = newSession;
        return newSession;
    }

    getSession(sessionId) {
        const session = this.sessions[sessionId];
        return session || null;
    }

    deleteSession(sessionId) {
        delete this.sessions[sessionId];
    }
}

const service = new VoteSessionManager();
module.exports = service;
