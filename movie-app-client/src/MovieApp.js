import React, { useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import MovieFinder from './MovieFinder';
import MovieListViewer from './MovieListViewer';
import useStyles from './styles/MovieAppStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import MovieVoter from './MovieVoter';
import { VoteSessionProvider } from './contexts/VoteSessionContext';
import Page from './Page';

export default function MovieApp() {
	const theme = useTheme();
	const classes = useStyles(theme);
	const location = useLocation();
	return (
		<div className={classes.root}>
			<TransitionGroup>
				<CSSTransition
					key={location.key}
					classNames="page"
					timeout={{
						enter: 300,
						exit: 300
					}}
				>
					<Switch location={location}>
						<Route
							exact
							path="/"
							render={(routeProps) => (
								<Page>
									<HomePage {...routeProps} />
								</Page>
							)}
						/>
						<Route
							exact
							path="/about"
							render={(routeProps) => (
								<Page>
									<AboutPage />
								</Page>
							)}
						/>
						<Route exact path="/find" render={(routeProps) => <MovieFinder {...routeProps} />} />
						<Route
							exact
							path="/movie-lists/:listId"
							render={(routeProps) => <MovieListViewer {...routeProps} />}
						/>
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
				</CSSTransition>
			</TransitionGroup>
		</div>
	);
}
