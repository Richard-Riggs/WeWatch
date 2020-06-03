import React, { createContext, useState, useEffect, useContext } from 'react';
import { MovieListsContext } from '../contexts/MovieListsContext';

export const VoteSessionContext = createContext();

export function VoteSessionProvider({ children, socket }) {
	const { selectedMovies, clearSelectedMovies } = useContext(MovieListsContext);
	const [ movieList, setMovieList ] = useState();
	const [ userCount, setUserCount ] = useState(0);
	const [ voteLimit, setVoteLimit ] = useState(0);
	const [ isLeader, setIsLeader ] = useState(false);
	const [ stage, setStage ] = useState();
	const [ error, setError ] = useState();

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
		socket.on('voteComplete', (results) => console.log(results));

		// Disconnect/cleanup on unmount
		return () => {
			socket.disconnect();
			clearSelectedMovies();
		};
	}, []);

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
				voteLimit
			}}
		>
			{children}
		</VoteSessionContext.Provider>
	);
}
