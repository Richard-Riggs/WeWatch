import React, { createContext, useState, useEffect, useContext } from 'react';
import { MovieListsContext } from '../contexts/MovieListsContext';
import { UserDataContext } from '../contexts/UserDataContext';
import io from 'socket.io-client';
import axios from 'axios';

export const VoteSessionContext = createContext();

export function VoteSessionProvider({ children, routeProps, socket }) {
	const { history, location } = routeProps;
	const { notifyUser } = useContext(UserDataContext);
	const { selectedMovies, clearSelectedMovies } = useContext(MovieListsContext);
	const [ movieList, setMovieList ] = useState();
	const [ userCount, setUserCount ] = useState(0);
	const [ voteLimit, setVoteLimit ] = useState(0);
	const [ isLeader, setIsLeader ] = useState(false);
	const [ stage, setStage ] = useState();
	const [ error, setError ] = useState();
	const [ results, setResults ] = useState();

	// Event Listeners
	useEffect(() => {
		socket.on('loadMovies', (data) => {
			if (data.error) {
				setStage('error');
				setError(data.error);
			} else {
				setMovieList(data.movieList);
				setVoteLimit(data.voteLimit);
				setStage(data.stage);
			}
		});
		socket.on('updateUserCount', (count) => setUserCount(count));
		socket.on('userIsLeader', (userIsLeader) => setIsLeader(userIsLeader));
		socket.on('startVote', (startData) => {
			if (startData.startVote) setStage(startData.stage);
		});
		socket.on('voteComplete', (results) => {
			setResults(results);
			setStage('results');
		});
		socket.on('terminate', () => {
			setStage('terminate');
			history.push('/');
		});

		// Disconnect/cleanup on unmount
		return () => {
			socket.disconnect();
			clearSelectedMovies();
		};
	}, []);

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

	// Event emitters
	const startVote = () => {
		if (isLeader) {
			socket.emit('startVote', true);
		}
	};

	const submitVote = () => {
		socket.emit('submitVote', selectedMovies);
		clearSelectedMovies();
	};

	const terminateSession = () => {
		socket.emit('terminate');
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
				terminateSession
			}}
		>
			{children}
		</VoteSessionContext.Provider>
	);
}
