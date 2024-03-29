// @ts-check

import React, { createContext, useState, useEffect, useContext } from 'react';
import { MovieListsContext } from './MovieListsContext';
import { UserDataContext } from './UserDataContext';
import { useRouteMatch, useHistory } from 'react-router-dom';
import VoteSocket from '../adapters/VoteSocket';
import VotesAPI from '../adapters/VotesAPI';


export const VoteSessionContext = createContext();

export function VoteSessionProvider({ children }) {
	const match = useRouteMatch('/vote/:sessionId');
	const history = useHistory();
	const { notifyError, notifyWarning, clientId } = useContext(UserDataContext);
	const { selectedMovies, clearSelectedMovies } = useContext(MovieListsContext);
	const [ movieList, setMovieList ] = useState();
	const [ userCount, setUserCount ] = useState(0);
	const [ voteLimit, setVoteLimit ] = useState(0);
	const [ isLeader, setIsLeader ] = useState(false);
	const [ stage, setStage ] = useState('');
	const [ error, setError ] = useState();
	const [ results, setResults ] = useState();

	const initiateVoteSession = async (movieList) => {
		const sessionData = await VotesAPI.createVoteSession(movieList, clientId);
		if (sessionData.error) {
			notifyError("Failed to create voting session.");
		} else {
			history.push(`/vote/${sessionData.sessionId}`);
		}
	};


	const handleLoadSessionData = (data) => {
		if (data.error) {
			setStage('error');
			setError(data.error);
		} else {
			if (Object.keys(data.results).length) {
				setResults(data.results);
			} else {
				setMovieList(data.movieList);
				setVoteLimit(data.voteLimit);
			}
			setStage(data.stage);
		}
	}

	const handleUpdateUserCount = (count) => setUserCount(count);

	const handleUserIsLeader = (userIsLeader) => setIsLeader(userIsLeader);

	const handleStartVote = (startData) => startData.startVote && setStage(startData.stage);

	const handleTerminate = () => {
		setStage('terminate');
		history.push('/');
	}

	const joinSession = (sessionId) => {
		VoteSocket.connectClient(sessionId, clientId);
		VoteSocket.onLoadSessionData(handleLoadSessionData);
		VoteSocket.onUpdateUserCount(handleUpdateUserCount);
		VoteSocket.onUserIsLeader(handleUserIsLeader);
		VoteSocket.onStartVote(handleStartVote);
		VoteSocket.onTerminate(handleTerminate);
	}

	useEffect(() => {
		if (match && match.isExact) {
			// Connect when first joining page
			if (!VoteSocket.connected) {
				joinSession(match.params.sessionId);
			}
		} else if (VoteSocket.connected) {
			// Cleanup when leaving page
			VoteSocket.disconnectClient();
			clearSelectedMovies();
			if (stage === 'terminate') {
				const message = isLeader
					? 'You have ended the voting session'
					: 'The leader has ended the voting session';

				notifyWarning(message);
			} else if (isLeader) {
				notifyWarning('Ending voting session...');
			}
			setStage('');
		}
	});

	return (
		<VoteSessionContext.Provider
			value={{
				movieList,
				userCount,
				isLeader,
				stage,
				error,
				voteLimit,
				results,
				initiateVoteSession,
				startVote: () => VoteSocket.startVote(),
				terminateSession: () => VoteSocket.terminateSession(),
				submitVote: () => {
					VoteSocket.submitVote(selectedMovies);
					clearSelectedMovies();
				}
			}}
		>
			{children}
		</VoteSessionContext.Provider>
	);
}
