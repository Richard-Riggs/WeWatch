import React, { useState, useContext, useEffect, memo } from 'react';
import Grid from '@material-ui/core/Grid';
import MovieCard from './MovieCard';
import { useTheme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import useToggleState from './hooks/useToggleState';
import MovieInfoDialog from './MovieInfoDialog';
import useStyles from './styles/MovieListStyles';
import { MovieListsContext } from './contexts/MovieListsContext';

export default memo(function MovieList({ movies, isLoading, mode, selectLimit }) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const { toggleMovie, selectedMovies } = useContext(MovieListsContext);
	const [ showInfo, toggleInfo ] = useToggleState(false);
	const [ movieInfo, setMovieInfo ] = useState('');
	const [ movieToToggle, setMovieToToggle ] = useState();

	const openInfo = (id) => {
		setMovieInfo(movies.find((m) => m.id === id));
		toggleInfo();
	};
	const closeInfo = () => toggleInfo();

	// Toggling logic must be handled in this effect using the movieToToggle state
	// in order for the memoized MovieCards to interact with the MovieLists context
	// as expected. Otherwise, the memoized cards are unable to toggle properly.
	useEffect(
		() => {
			if (movieToToggle) {
				toggleMovie(movieToToggle);
				setMovieToToggle();
			}
		},
		[ movieToToggle ]
	);

	return (
		<div>
			<Grid className={classes.gridContainer} container>
				{movies.map((m) => {
					const selected = selectedMovies.find((sm) => sm.id === m.id) ? true : false;
					const disabled =
						(mode === 'edit' && !selected) ||
						(!selected && selectLimit && selectedMovies.length >= selectLimit);

					// Card is toggleable if it's already selected, if there's no select limit,
					// or if the number of selected movies is under the select limit
					const toggleAble =
						(selected || (!selectLimit || selectedMovies.length < selectLimit)) && mode !== 'view';
					return (
						<MovieCard
							movie={m}
							key={m.id}
							openInfo={openInfo}
							selected={selected}
							disabled={disabled}
							toggleAble={toggleAble}
							toggleMovie={setMovieToToggle}
						/>
					);
				})}

				{isLoading &&
					[ ...Array(10) ].map((n, i) => (
						<Grid item xs="auto" className={classes.gridItem} style={{ display: 'block' }} key={`skel${i}`}>
							<Skeleton className={classes.gridSkeletonPoster} variant="rect" />
							<Skeleton className={classes.gridSkeletonText} variant="rect" />
						</Grid>
					))}
				<Grid item xs="auto" className={classes.cardSpacer} />
				<Grid item xs="auto" className={classes.cardSpacer} />
				<Grid item xs="auto" className={classes.cardSpacer} />
				<Grid item xs="auto" className={classes.cardSpacer} />
				<MovieInfoDialog showInfo={showInfo} closeInfo={closeInfo} movieInfo={movieInfo} />
			</Grid>
		</div>
	);
});
