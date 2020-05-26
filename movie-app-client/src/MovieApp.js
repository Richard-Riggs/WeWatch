import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import HomePage from './HomePage';
import MovieFinder from './MovieFinder';
import useStyles from './styles/MovieAppStyles';
import Navbar from './Navbar';

export default function MovieApp() {
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<div className={classes.root}>
			<Navbar />
			<Switch>
				<Route exact path="/" render={(routeProps) => <HomePage {...routeProps} />} />
				<Route exact path="/new" render={(routeProps) => <MovieFinder {...routeProps} />} />
			</Switch>
		</div>
	);
}
