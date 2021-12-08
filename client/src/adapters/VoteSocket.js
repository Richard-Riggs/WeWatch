import io from 'socket.io-client';
import config from '../constants/api';

class VoteSocket {
    
    constructor() {
        this.namespace = config.wewatch_sockets.vote.namespace;
        this.reset();
    }

    reset() {
        this.clientId = "";
        this.sessionId = "";
        this.socket = null;
        this.connected = false;
    }

    getClientId = () => this.clientId;

    connectClient(sessionId, clientId) {
        if (this.socket) return;

        this.socket = io('/vote', {
            query: {
                sessionId: sessionId,
                clientId: clientId
            }
        });

        this.connected = true;
    }

    startVote() {
        if (!this.socket) return;
        this.socket.emit('startVote', true);
	};

    submitVote(selectedMovies) {
        if (!this.socket) return;
        this.socket.emit('submitVote', selectedMovies);
	};

    terminateSession() {
		if (!this.socket) return;
        this.socket.emit('terminate');
	};

    disconnectClient() {
        this.socket.disconnect();
        this.reset();
    }

    onLoadSessionData(eventHandler) {
        if (!this.socket) return;
        this.socket.on('loadSessionData', (data) => eventHandler(data));
    }

    onUpdateUserCount(eventHandler) {
        if (!this.socket) return;
        this.socket.on('updateUserCount', (count) => eventHandler(count));
    }

    onUserIsLeader(eventHandler) {
        if (!this.socket) return;
        this.socket.on('userIsLeader', (userIsLeader) => eventHandler(userIsLeader));
    }

    onStartVote(eventHandler) {
        if (!this.socket) return;
        this.socket.on('startVote', (startData) => eventHandler(startData));
    }

    onTerminate(eventHandler) {
        if (!this.socket) return;
        this.socket.on('terminate', () => eventHandler());
    }

}

export default new VoteSocket();
