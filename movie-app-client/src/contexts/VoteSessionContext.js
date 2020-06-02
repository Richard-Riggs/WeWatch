import React, { createContext, useState, useEffect } from 'react';

export const VoteSessionContext = createContext();

export function VoteSessionProvider({ children, socket }) {
	const [ movieList, setMovieList ] = useState();
	const [ userCount, setUserCount ] = useState(0);
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
				setStage('lobby');
			}
		});
		socket.on('updateUserCount', (count) => setUserCount(count));
		socket.on('userIsLeader', (userIsLeader) => setIsLeader(userIsLeader));
		socket.on('startVote', (startVote) => {
			if (startVote) setStage('vote');
		});
	}, []);

	// Event emitters
	const startVote = () => {
		if (isLeader) {
			socket.emit('startVote', true);
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
				error
			}}
		>
			{children}
		</VoteSessionContext.Provider>
	);
}
