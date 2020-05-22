import React from 'react';
import Grid from '@material-ui/core/Grid';
import MovieCard from './MovieCard';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
	gridContainer: {
		maxWidth: '100%',
		margin: 0
	},
	gridItem: {
		display: 'flex',
		boxSizing: 'content-box',
		maxWidth: '300px'
	},
	gridSkeleton: {
		backgroundColor: 'rgba(0,0,0,0.25)'
	}
}));

export default function MovieList({ movies, isLoading }) {
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
				{isLoading &&
					[ ...Array(10) ].map((n) => (
						<Grid item xs className={classes.gridItem} style={{ display: 'block' }}>
							<Skeleton
								className={classes.gridSkeleton}
								variant="rect"
								style={{ width: '300px', height: '450px' }}
							/>
							<Skeleton className={classes.gridSkeleton} variant="text" width={300} height={100} />
						</Grid>
					))}
			</Grid>
		</div>
	);
}
