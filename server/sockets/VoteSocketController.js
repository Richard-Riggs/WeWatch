// @ts-check
const { SocketController } = require('./SocketController');
const voteSessionManager = require('../services/voteSessions/VoteSessionManager');


class VoteSocketController extends SocketController {

    constructor(namespace, socket, voteSession, clientId) {
        super(namespace, socket, voteSession.id);

        this.voteSession = voteSession;
        this.clientId = clientId;
        this.voteSessionId = voteSession.id;

        this.connectClient();
        this.registerEventHandlers();
    }

    static handleNamespace(socketServer, namespaceString) {
        const namespace = socketServer.of(namespaceString);
        namespace.on('connection', (socket) => {
            const { sessionId, clientId } = socket.handshake.query;
            const session = voteSessionManager.getSession(sessionId);
            if (!session) {
                socket.emit('loadSessionData', { error: 'Voting session does not exist.' });
                return null;
            } else if (session.clientIsConnected(clientId)) {
                socket.emit('loadSessionData', { error: 'Your web browser is already connected to this voting lobby.' });
                return null;
            }

            return new VoteSocketController(namespace, socket, session, clientId)
        });
    }

    registerEventHandlers() {
		this.socket.on('startVote', (payload) => this.startVote(payload));
		this.socket.on('submitVote', (payload) => this.submitVote(payload));
		this.socket.on('disconnect', () => this.disconnectClient());
		this.socket.on('terminate', () => this.terminateSession());
    }

    connectClient() {
        super.addClientToRoom();
		this.voteSession.addClient(this.clientId);

		if (this.voteSession.leaderId === this.clientId) {
			this.socket.emit('userIsLeader', true);
		}

        const sessionData = this.voteSession.getData();
        this.socket.emit('loadSessionData', sessionData);
		this.namespace.to(this.voteSessionId).emit('updateUserCount', this.voteSession.clientCount);
    }

    startVote(startVote) {
        if (this.voteSession.leaderId === this.clientId) {
            this.voteSession.stage = 'vote';
            this.namespace.to(this.voteSessionId).emit('startVote', {
                startVote: startVote,
                stage: this.voteSession.stage
            });
        }
    }

    submitVote(selectedMovies) {
        if (!this.voteSession.clientHasVoted(this.clientId)) {
            this.voteSession.submitClientVotes(this.clientId, selectedMovies);

            // Triggers if votes have been received from all clients
            if (this.voteSession.allClientsVoted) {
                this.voteSession.processResults();
                const sessionData = this.voteSession.getData();
                this.namespace.to(this.voteSessionId).emit('loadSessionData', sessionData);
            }
        }
    }

    disconnectClient() {
        this.voteSession.removeClient(this.clientId);
        this.namespace.to(this.voteSessionId).emit('updateUserCount', this.voteSession.clientCount);

        // Terminates voting session if leader disconnects without emitting 'terminate'
        if (this.clientId === this.voteSession.leaderId) {
            setTimeout(() => {
                // Check if leader hasn't reconnected within 5 seconds.
                if (!this.voteSession.clientIsConnected(this.clientId)) {
                    this.terminateSession();
                }
            }, 5000);
        }
    }

    terminateSession() {
        if (this.clientId === this.voteSession.leaderId) {
            super.disconnectAllSockets('terminate');
            voteSessionManager.deleteSession(this.voteSessionId);
        };
    }
}

module.exports = { VoteSocketController };
