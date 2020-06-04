import React, { useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import MovieFinder from './MovieFinder';
import MovieListViewer from './MovieListViewer';
import useStyles from './styles/MovieAppStyles';
import Navbar from './Navbar';
import MovieVoter from './MovieVoter';
import { VoteSessionProvider } from './contexts/VoteSessionContext';
import { UserDataContext } from './contexts/UserDataContext';
import io from 'socket.io-client';

export default function MovieApp() {
	const { clientId } = useContext(UserDataContext);
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<div className={classes.root}>
			<Switch>
				<Route exact path="/" render={(routeProps) => <HomePage {...routeProps} />} />
				<Route exact path="/new" render={(routeProps) => <MovieFinder {...routeProps} />} />
				<Route exact path="/movie-lists/:listId" render={(routeProps) => <MovieListViewer {...routeProps} />} />
				<Route
					exact
					path="/vote/:sessionId"
					render={(routeProps) => {
						const socket = io('/vote', {
							query: {
								sessionId: routeProps.match.params.sessionId,
								clientId: clientId
							}
						});
						return (
							<VoteSessionProvider socket={socket}>
								<MovieVoter {...routeProps} />
							</VoteSessionProvider>
						);
					}}
				/>
			</Switch>
		</div>
	);
}
