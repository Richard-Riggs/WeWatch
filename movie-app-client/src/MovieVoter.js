import React, { useContext, useEffect } from 'react';
import Navbar from './Navbar';
import MovieVoterNav from './MovieVoterNav';
import useStyles from './styles/MovieVoterStyles';
import VotingLobby from './VotingLobby';
import { VoteSessionContext } from './contexts/VoteSessionContext';
import MovieList from './MovieList';
import VoteResults from './VoteResults';

export default function MovieVoter({ history }) {
	const { stage, error, movieList, voteLimit } = useContext(VoteSessionContext);
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<MovieVoterNav history={history} />
			{stage === 'lobby' && <VotingLobby />}
			{stage === 'vote' && <MovieList mode="vote" movies={movieList.movies} selectLimit={voteLimit} />}
			{stage === 'results' && <VoteResults />}
			{stage === 'error' && <h2>Error: {error}</h2>}
		</div>
	);
}
