// @ts-check

exports.deleteRoom = (namespace, roomId, emitEvent) => {
    const sockets = namespace.in(roomId).connected;
	for (const socket in sockets) {
        if (emitEvent) {
            sockets[socket].emit(emitEvent);
        }
		sockets[socket].disconnect(true);
	}
}
