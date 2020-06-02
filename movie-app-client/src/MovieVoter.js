import React, { useContext } from 'react';
import Navbar from './Navbar';
import useStyles from './styles/MovieVoterStyles';
import VotingLobby from './VotingLobby';
import { VoteSessionContext } from './contexts/VoteSessionContext';
import MovieList from './MovieList';

export default function MovieVoter(props) {
	const { stage, error, movieList } = useContext(VoteSessionContext);
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Navbar />
			{stage === 'lobby' && <VotingLobby />}
			{stage === 'vote' && <MovieList mode="vote" movies={movieList.movies} selectLimit={5} />}
			{stage === 'error' && <h2>Error: {error}</h2>}
		</div>
	);
}
