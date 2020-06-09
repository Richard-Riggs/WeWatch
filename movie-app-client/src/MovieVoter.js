import React, { useContext, useEffect } from 'react';
import MovieVoterNav from './MovieVoterNav';
import useStyles from './styles/MovieVoterStyles';
import VotingLobby from './VotingLobby';
import { VoteSessionContext } from './contexts/VoteSessionContext';
import VoteResults from './VoteResults';
import VoteGrid from './VoteGrid';

export default function MovieVoter({ history }) {
  const { stage, error } = useContext(VoteSessionContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MovieVoterNav history={history} />
      {stage === 'lobby' && <VotingLobby />}
      {(stage === 'vote' || stage === 'revote') && <VoteGrid />}
      {stage === 'results' && <VoteResults />}
      {stage === 'error' && <h2>Error: {error}</h2>}
    </div>
  );
}
