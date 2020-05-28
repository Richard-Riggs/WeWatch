import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import MovieCard from './MovieCard';
import { useTheme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import useToggleState from './hooks/useToggleState';
import MovieInfoDialog from './MovieInfoDialog';
import useStyles from './styles/MovieListStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function MovieList({ movies, isLoading, showSelected, toggleShowSelected }) {
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
			<Grid className={classes.gridContainer} container justify="space-around" spacing={3}>
				<Grid item xs={10}>
					<FormControlLabel
						control={<Checkbox color="primary" checked={showSelected} onChange={toggleShowSelected} />}
						label="Only View Selection"
					/>
				</Grid>

				{movies.map((m) => <MovieCard movie={m} key={m.id} openInfo={openInfo} selected={showSelected} />)}
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
				<MovieInfoDialog showInfo={showInfo} closeInfo={closeInfo} movieInfo={movieInfo} />
			</Grid>
		</div>
	);
}
