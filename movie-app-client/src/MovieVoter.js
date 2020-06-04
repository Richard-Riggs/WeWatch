import React, { useContext, useEffect } from 'react';
import Navbar from './Navbar';
import MovieVoterNav from './MovieVoterNav';
import useStyles from './styles/MovieVoterStyles';
import VotingLobby from './VotingLobby';
import { VoteSessionContext } from './contexts/VoteSessionContext';
import MovieList from './MovieList';

export default function MovieVoter(props) {
	const { stage, error, movieList, voteLimit } = useContext(VoteSessionContext);
	const classes = useStyles();
	useEffect(
		() => {
			if (stage === 'vote') {
				alert('next voting stage!');
			}
		},
		[ movieList ]
	);
	return (
		<div className={classes.root}>
			<MovieVoterNav />
			{stage === 'lobby' && <VotingLobby />}
			{stage === 'vote' && <MovieList mode="vote" movies={movieList.movies} selectLimit={voteLimit} />}
			{stage === 'error' && <h2>Error: {error}</h2>}
		</div>
	);
}
