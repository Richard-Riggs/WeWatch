const short = require('short-uuid');
const _ = require('lodash');

const deleteSession = (sessions, sessionId) => {
	_.remove(sessions, (s) => s.id === sessionId);
};

exports.deleteSession = deleteSession;

exports.getVoteLimit = (listLength) => {
	return listLength >= 10 ? 5 : Math.ceil(listLength / 2);
};

exports.getVoteWinner = (movieVotes) => {
	const voteReducer = (voteMap, movieVote) => voteMap.set(movieVote.id, (voteMap.get(movieVote.id) || 0) + 1);
	const resultsMap = movieVotes.reduce(voteReducer, new Map());
	const findWinner = (resultsMap) => {
		let highVotes = 0,
			winners = [];
		for (const [ movie, votes ] of resultsMap) {
			if (votes > highVotes) {
				highVotes = votes;
				winners = [ movie ];
			} else if (votes === highVotes) {
				winners.push(movie);
			}
		}
		return { highVotes, winners };
	};
	const results = findWinner(resultsMap);
	results.winners = results.winners.map((w) => movieVotes.find((mv) => mv.id === w));
	return results;
};

exports.updateUserCount = (namespace, sessionData) => {
	namespace.to(sessionData.id).emit('updateUserCount', sessionData.clients.length);
};

exports.terminateSession = (sessions, namespace, sessionId) => {
	const sessionSockets = namespace.in(sessionId).connected;
	for (const socket in sessionSockets) {
		sessionSockets[socket].emit('terminate').disconnect(true);
	}
	deleteSession(sessions, sessionId);
};
