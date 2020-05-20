import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Navbar from './Navbar';

import MovieFinder from './MovieFinder';
import useStyles from './styles/MovieAppStyles';

export default function MovieApp() {
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<div className={classes.root}>
			<Grid container justify="center">
				<Grid item xs={12}>
					<Navbar />
				</Grid>
				<Grid item xs={12} md={10}>
					<MovieFinder />
				</Grid>
			</Grid>
		</div>
	);
}
