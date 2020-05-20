import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import MovieFinder from './MovieFinder';
import useStyles from './styles/MovieAppStyles';

export default function MovieApp() {
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<Grid container className={classes.root}>
			<h1>Movie App!</h1>
			<Grid item xs={12}>
				<MovieFinder />
			</Grid>
		</Grid>
	);
}
