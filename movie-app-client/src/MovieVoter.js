import React, { useContext, useEffect } from 'react';
import Navbar from './Navbar';
import MovieVoterNav from './MovieVoterNav';
import useStyles from './styles/MovieVoterStyles';
import VotingLobby from './VotingLobby';
import { VoteSessionContext } from './contexts/VoteSessionContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import VoteResults from './VoteResults';
import VoteGrid from './VoteGrid';
import Page from './Page';

export default function MovieVoter({ history }) {
	const { stage, error } = useContext(VoteSessionContext);
	const classes = useStyles();
	const Offset = () => <div className={classes.offset} />;

	return (
		<div className={classes.root}>
			<Navbar>
				<MovieVoterNav history={history} />
			</Navbar>
			<TransitionGroup>
				{stage === 'lobby' && (
					<CSSTransition classNames="page" timeout={300}>
						<Page>
							<Offset />
							<VotingLobby />
						</Page>
					</CSSTransition>
				)}
				{(stage === 'vote' || stage === 'revote') && (
					<CSSTransition classNames="page" timeout={300}>
						<Page>
							<Offset />
							<VoteGrid />
						</Page>
					</CSSTransition>
				)}
				{stage === 'results' && (
					<CSSTransition classNames="page" timeout={300}>
						<Page>
							<Offset />
							<VoteResults />
						</Page>
					</CSSTransition>
				)}
				{stage === 'error' && (
					<CSSTransition classNames="page" timeout={300}>
						<Page>
							<Offset />
							<h2>Error: {error}</h2>
						</Page>
					</CSSTransition>
				)}
			</TransitionGroup>
		</div>
	);
}
