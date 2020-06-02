import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import MovieFinder from './MovieFinder';
import MovieListViewer from './MovieListViewer';
import useStyles from './styles/MovieAppStyles';
import Navbar from './Navbar';
import MovieVoter from './MovieVoter';

export default function MovieApp() {
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<div className={classes.root}>
			<Switch>
				<Route exact path="/" render={(routeProps) => <HomePage {...routeProps} />} />
				<Route exact path="/new" render={(routeProps) => <MovieFinder {...routeProps} />} />
				<Route exact path="/movie-lists/:listId" render={(routeProps) => <MovieListViewer {...routeProps} />} />
				<Route exact path="/vote/:sessionId" render={(routeProps) => <MovieVoter {...routeProps} />} />
			</Switch>
		</div>
	);
}

//routeProps.match.params.listId
