import React, { useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import MovieFinder from './MovieFinder';
import MovieListViewer from './MovieListViewer';
import useStyles from './styles/MovieAppStyles';
import Navbar from './Navbar';
import io from 'socket.io-client';

import MovieVoter from './MovieVoter';
import { VoteSessionProvider } from './contexts/VoteSessionContext';
import { UserDataContext } from './contexts/UserDataContext';

export default function MovieApp() {
	const { clientId } = useContext(UserDataContext);
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<div className={classes.root}>
			<Switch>
				<Route exact path="/" render={(routeProps) => <HomePage {...routeProps} />} />
				<Route exact path="/about" render={(routeProps) => <AboutPage />} />
				<Route exact path="/find" render={(routeProps) => <MovieFinder {...routeProps} />} />
				<Route exact path="/movie-lists/:listId" render={(routeProps) => <MovieListViewer {...routeProps} />} />
				<Route
					exact
					path="/vote/:sessionId"
					render={(routeProps) => {
						const sessionId = routeProps.match.params.sessionId;

						return (
							<VoteSessionProvider sessionId={sessionId} routeProps={routeProps}>
								<MovieVoter {...routeProps} />
							</VoteSessionProvider>
						);
					}}
				/>
			</Switch>
		</div>
	);
}
