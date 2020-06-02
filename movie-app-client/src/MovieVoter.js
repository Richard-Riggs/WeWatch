import React, { useContext } from 'react';
import Navbar from './Navbar';
import useStyles from './styles/MovieVoterStyles';
import VotingLobby from './VotingLobby';
import { VoteSessionContext } from './contexts/VoteSessionContext';

export default function MovieVoter(props) {
	const { stage, error } = useContext(VoteSessionContext);
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Navbar />
			{stage === 'lobby' && <VotingLobby />}
			{stage === 'vote' && <h1>VOTE!!!!!</h1>}
			{stage === 'error' && <h2>Error: {error}</h2>}
		</div>
	);
}
