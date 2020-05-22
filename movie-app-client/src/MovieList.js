import React from 'react';
import Grid from '@material-ui/core/Grid';
import MovieCard from './MovieCard';
import { useTheme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	gridContainer: {
		maxWidth: '100%',
		margin: 0
	},
	gridItem: {
		display: 'flex',
		maxWidth: '300px'
	}
}));

export default function MovieList({ movies }) {
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<div>
			<Grid className={classes.gridContainer} container justify="space-around" spacing={3}>
				{movies.map((m) => (
					<Grid className={classes.gridItem} item xs>
						<MovieCard {...m} key={m.id} />
					</Grid>
				))}
			</Grid>
		</div>
	);
}
