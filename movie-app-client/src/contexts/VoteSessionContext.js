import React, { createContext, useState, useEffect, useContext } from 'react';
import { MovieListsContext } from '../contexts/MovieListsContext';
import { UserDataContext } from '../contexts/UserDataContext';
import { useRouteMatch, useHistory } from 'react-router-dom';
import io from 'socket.io-client';

export const VoteSessionContext = createContext();

export function VoteSessionProvider({ children }) {
	const match = useRouteMatch('/vote/:sessionId');
	const history = useHistory();
	const [ sessionId, setSessionId ] = useState('');
	const { notifyUser, clientId } = useContext(UserDataContext);
	const { selectedMovies, clearSelectedMovies } = useContext(MovieListsContext);
	const [ movieList, setMovieList ] = useState();
	const [ userCount, setUserCount ] = useState(0);
	const [ voteLimit, setVoteLimit ] = useState(0);
	const [ isLeader, setIsLeader ] = useState(false);
	const [ stage, setStage ] = useState();
	const [ error, setError ] = useState();
	const [ results, setResults ] = useState();
	const [ sessionSocket, setSessionSocket ] = useState();

	if (match && match.isExact) {
		if (match.params.sessionId !== sessionId) {
			setSessionId(match.params.sessionId);
		}
	} else if (sessionId && sessionSocket) {
		// Cleanup when leaving page
		setSessionId('');
		sessionSocket.disconnect();
		clearSelectedMovies();
	}

	// Event Listeners
	useEffect(
		() => {
			const socket = io('/vote', {
				query: {
					sessionId: sessionId,
					clientId: clientId
				}
			});
			setSessionSocket(socket);

			socket.on('loadSessionData', (data) => {
				if (data.error) {
					setStage('error');
					setError(data.error);
				} else {
					if (Object.keys(data.results).length) {
						setResults(data.results);
					} else {
						setMovieList(data.movieList);
						setVoteLimit(data.voteLimit);
					}
					setStage(data.stage);
				}
			});
			socket.on('updateUserCount', (count) => setUserCount(count));
			socket.on('userIsLeader', (userIsLeader) => setIsLeader(userIsLeader));
			socket.on('startVote', (startData) => {
				if (startData.startVote) setStage(startData.stage);
			});
			socket.on('terminate', () => {
				setStage('terminate');
				console.log(history);
				history.push('/');
			});
		},
		[ sessionId ]
	);

	useEffect(
		() => {
			if (stage === 'terminate') {
				const message = isLeader
					? 'You have ended the voting session'
					: 'The leader has ended the voting session';
				notifyUser({ severity: 'warning', message: message });
			}
		},
		[ stage, isLeader ]
	);

	const startVote = () => {
		if (sessionSocket) {
			if (isLeader) {
				sessionSocket.emit('startVote', true);
			}
		}
	};

	const submitVote = () => {
		if (sessionSocket) {
			sessionSocket.emit('submitVote', selectedMovies);
			clearSelectedMovies();
		}
	};

	const terminateSession = () => {
		if (sessionSocket) {
			sessionSocket.emit('terminate');
		}
	};

	return (
		<VoteSessionContext.Provider
			value={{
				movieList,
				userCount,
				isLeader,
				stage,
				startVote,
				error,
				submitVote,
				voteLimit,
				results,
				sessionSocket,
				terminateSession
			}}
		>
			{children}
		</VoteSessionContext.Provider>
	);
}
