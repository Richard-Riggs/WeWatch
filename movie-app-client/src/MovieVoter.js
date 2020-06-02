import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Navbar from './Navbar';
import useStyles from './styles/MovieVoterStyles';
import VotingLobby from './VotingLobby';

export default function MovieVoter(props) {
	const { sessionId } = props.match.params;
	const [ movieList, setMovieList ] = useState();
	const [ userCount, setUserCount ] = useState(0);
	const [ isLeader, setIsLeader ] = useState(false);
	const classes = useStyles();

	useEffect(() => {
		const socket = io('/vote', {
			query: {
				sessionId: sessionId
			}
		});
		socket.on('loadMovies', (data) => setMovieList(data.movieList));
		socket.on('updateUserCount', (count) => setUserCount(count));
		socket.on('userIsLeader', (userIsLeader) => setIsLeader(userIsLeader));
	}, []);

	return (
		<div className={classes.root}>
			<Navbar />
			{movieList && movieList !== 'error' ? (
				<VotingLobby movieList={movieList} userCount={userCount} isLeader={isLeader} />
			) : (
				<p>Error</p>
			)}
		</div>
	);
}
