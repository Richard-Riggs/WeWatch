import React, { useContext } from 'react';
import { VoteSessionContext } from '../../../contexts/VoteSessionContext';
import useStyles from './styles';

export default function VoteResults() {
	const { results } = useContext(VoteSessionContext);
	const classes = useStyles();

	const headerContent = results.winners.length > 1 ? 'TIE' : 'WINNER';
	const subHeaderContent =
		results.winners.length > 1 ? (
			<h2 className={classes.subHeader}>
				Each of these movies received {results.highVotes} {results.highVotes === 1 ? 'vote' : 'votes'} in the
				tiebreaker.
			</h2>
		) : (
			<h2 className={classes.subHeader}>
				<span>{results.winners[0].title}</span> won with {results.highVotes} votes.
			</h2>
		);

	return (
		<div className={classes.root}>
			<h1 className={classes.header}>{headerContent}</h1>
			<div className={classes.winners}>
				{results.winners.map((w) => (
					<div className={classes.winner}>
						<img src={`https://image.tmdb.org/t/p/w500${w.poster_path}`} alt={w.title} />
					</div>
				))}
			</div>
			{subHeaderContent}
		</div>
	);
}
