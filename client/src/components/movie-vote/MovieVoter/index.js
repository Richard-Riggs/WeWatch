import React, { useContext } from 'react';
import useStyles from './styles';
import VotingLobby from '../VotingLobby';
import { VoteSessionContext } from '../../../contexts/VoteSessionContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import VoteResults from '../VoteResults';
import VoteGrid from '../VoteGrid';
import Page from '../../common/Page';

export default function MovieVoter() {
	const { stage, error } = useContext(VoteSessionContext);
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<TransitionGroup>
				{stage === 'lobby' && (
					<CSSTransition classNames="page" timeout={300}>
						<Page>
							<VotingLobby />
						</Page>
					</CSSTransition>
				)}
				{(stage === 'vote' || stage === 'revote') && (
					<CSSTransition classNames="page" timeout={300}>
						<Page>
							<VoteGrid />
						</Page>
					</CSSTransition>
				)}
				{stage === 'results' && (
					<CSSTransition classNames="page" timeout={300}>
						<Page>
							<VoteResults />
						</Page>
					</CSSTransition>
				)}
				{stage === 'error' && (
					<CSSTransition classNames="page" timeout={300}>
						<Page>
							<h2>Error: {error}</h2>
						</Page>
					</CSSTransition>
				)}
			</TransitionGroup>
		</div>
	);
}
