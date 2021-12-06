// @ts-check

const { VoteSessionService } = require('./VoteSessionService');


class VoteSessionManager {

    constructor() {
        this.sessions = {};
    }

    createNewSession(movieList, leaderId) {
        const newSession = new VoteSessionService(movieList, leaderId);
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
