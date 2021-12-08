// @ts-check


class SocketController {

    constructor(namespace, socket, roomId) {
        this.namespace = namespace;
        this.socket = socket;
        this.roomId = roomId;
    }

    addClientToRoom() {
        this.socket.join(this.roomId);
    }

    disconnectAllSockets(emitEvent = "", emitData = null) {
        const sockets = this.namespace.in(this.roomId).connected;
        for (const socket in sockets) {
            if (emitEvent) {
                sockets[socket].emit(emitEvent, emitData);
            }
            sockets[socket].disconnect(true);
        }
    }

}

module.exports = { SocketController };
