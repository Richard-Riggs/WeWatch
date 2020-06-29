import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import MovieFinder from './MovieFinder';
import MovieListViewer from './MovieListViewer';
import useStyles from './styles/MovieAppStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Toolbar from '@material-ui/core/Toolbar';
import MovieVoter from './MovieVoter';
import Page from './Page';
import Navbar from './Navbar';
import { Scrollbars } from 'react-custom-scrollbars';

export default function MovieApp() {
	const theme = useTheme();
	const classes = useStyles(theme);
	const location = useLocation();
	console.log(theme.mixins.toolbar);
	return (
		<div className={classes.root}>
			<Navbar />
			<div className={classes.appWindow}>
				<Toolbar />
				<Scrollbars
					renderView={(props) => <div {...props} id="scroller" />}
					renderThumbVertical={(props) => <div {...props} className={classes.verticalScroll} />}
					autoHide
				>
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
							</Switch>
						</CSSTransition>
					</TransitionGroup>
				</Scrollbars>
			</div>
		</div>
	);
}
