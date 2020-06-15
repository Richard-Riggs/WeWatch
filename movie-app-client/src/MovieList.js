import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import MovieCard from './MovieCard';
import { useTheme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import useToggleState from './hooks/useToggleState';
import MovieInfoDialog from './MovieInfoDialog';
import useStyles from './styles/MovieListStyles';

export default function MovieList({ movies, isLoading, showSelected, mode, selectLimit }) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [ showInfo, toggleInfo ] = useToggleState(false);
	const [ movieInfo, setMovieInfo ] = useState('');

	const openInfo = (id) => {
		setMovieInfo(movies.find((m) => m.id === id));
		toggleInfo();
	};
	const closeInfo = () => toggleInfo();

	return (
		<div>
			<Grid className={classes.gridContainer} container justify="space-evenly">
				{movies.map((m) => (
					<MovieCard
						mode={mode}
						movie={m}
						key={m.id}
						openInfo={openInfo}
						selected={showSelected}
						selectLimit={selectLimit}
					/>
				))}

				{isLoading &&
					[ ...Array(10) ].map((n, i) => (
						<Grid item xs className={classes.gridItem} style={{ display: 'block' }} key={`skel${i}`}>
							<Skeleton
								className={classes.gridSkeleton}
								variant="rect"
								style={{ width: '300px', height: '450px' }}
							/>
							<Skeleton className={classes.gridSkeleton} variant="text" width={300} height={100} />
						</Grid>
					))}
				<Grid item xs="auto" className={classes.cardSpacer} />
				<Grid item xs className={classes.cardSpacer} />
				<Grid item xs className={classes.cardSpacer} />
				<Grid item xs className={classes.cardSpacer} />
				<MovieInfoDialog showInfo={showInfo} closeInfo={closeInfo} movieInfo={movieInfo} />
			</Grid>
		</div>
	);
}
