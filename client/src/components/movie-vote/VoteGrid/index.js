import React, { useContext } from 'react';
import MovieList from '../../movie-list/MovieList';
import { VoteSessionContext } from '../../../contexts/VoteSessionContext';
import useStyles from './styles';

export default function VoteGrid() {
	const { movieList, voteLimit, stage } = useContext(VoteSessionContext);
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<header>
				<h1>{stage === 'vote' ? 'Vote!' : 'Tiebreaker!'}</h1>
				<p>
					Please select the {voteLimit > 1 ? `${voteLimit} movies` : 'movie'} you're most interested in
					watching.
				</p>
			</header>
			<MovieList mode="vote" movies={movieList.movies} selectLimit={voteLimit} />
		</div>
	);
}
