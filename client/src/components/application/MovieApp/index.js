import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../home/HomePage';
import AboutPage from '../../home/AboutPage';
import MovieFinder from '../../movie-finder/MovieFinder';
import MovieListViewer from '../../movie-list/MovieListViewer';
import MovieVoter from '../../movie-vote/MovieVoter';
import CustomNavWindow from '../../common/CustomNavWindow';
import useStyles from './styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Page from '../../common/Page';

export default function MovieApp() {
	const theme = useTheme();
	const classes = useStyles(theme);
	const location = useLocation();
	return (
		<div className={classes.root}>
			<CustomNavWindow>
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
							<Route
								exact
								path="/find"
								render={(routeProps) => (
									<Page>
										<MovieFinder {...routeProps} />
									</Page>
								)}
							/>
							<Route
								exact
								path="/movie-lists/:listId"
								render={(routeProps) => (
									<Page>
										<MovieListViewer {...routeProps} />
									</Page>
								)}
							/>
							<Route
								exact
								path="/vote/:sessionId"
								render={(routeProps) => {
									return (
										<Page>
											<MovieVoter {...routeProps} />
										</Page>
									);
								}}
							/>
							<Route
								path="*"
								render={(routeProps) => (
									<Page>
										<HomePage {...routeProps} />
									</Page>
								)}
							/>
						</Switch>
					</CSSTransition>
				</TransitionGroup>
			</CustomNavWindow>
		</div>
	);
}
