import React, { useState, useEffect, useContext } from 'react';
import { isBrowser } from 'react-device-detect';
import FinderForm from '../FinderForm';
import MovieList from '../../movie-list/MovieList';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './styles';
import { MovieListsContext } from '../../../contexts/MovieListsContext';
import { UserDataContext } from '../../../contexts/UserDataContext';
import MoviesAPI from '../../../adapters/MoviesAPI';

export default function MovieFinder() {
	const { selectedMovies, clearSelectedMovies } = useContext(MovieListsContext);
	const { notifyError } = useContext(UserDataContext);
	const theme = useTheme();
	const classes = useStyles(theme);
	const [ movies, setMovies ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ query, setQuery ] = useState({});
	const [ resultsPage, setResultsPage ] = useState(0);
	const [ showSelected, setShowSelected ] = useState(false);
	const [ hasMore, setHasMore ] = useState(false);
	const toggleShowSelected = () => setShowSelected(!showSelected);

	const fetchMovies = async () => {
		if (Object.keys(query).length && !isLoading) {
			setIsLoading(true);
			const nextPage = resultsPage + 1;
			const moviesData = await MoviesAPI.fetchMovies(query.type, query.value, nextPage);
			if (moviesData.movies.length) setMovies([ ...movies, ...moviesData.movies ]);
			setResultsPage(nextPage);

			if (moviesData.error) {
				setHasMore(false);
				setQuery({});
				notifyError("Error: There was a problem loading movies.");
			} else {
				setHasMore(!(movies.length >= 500) && moviesData.totalPages > 0 && nextPage < moviesData.totalPages);
			}
			setIsLoading(false);
		}
	};

	// This useEffect chain is used to ensure that the movies and resultsPage state resets
	// BEFORE processing the new query. Otherwise, the old movies are not removed.
	useEffect(
		() => {
			setResultsPage(0);
			setMovies([]);
		},
		[ query ]
	);

	useEffect(
		() => {
			if (movies.length === 0 && Object.keys(query).length) {
				(async () => await fetchMovies())();
			}
		},
		[ movies, fetchMovies ]
	);

	useEffect(
		() => {
			if (selectedMovies.length === 0) {
				setShowSelected(false);
			}
		},
		[ selectedMovies ]
	);

	// Clears movie selection when leaving page
	useEffect(() => {
		return () => {
			clearSelectedMovies();
		};
	}, []);

	return (
		<div className={classes.root}>
			<FinderForm
				setQuery={setQuery}
				showSelected={showSelected}
				toggleShowSelected={toggleShowSelected}
				selectedMovies={selectedMovies}
			/>

			<InfiniteScroll
				dataLength={movies.length}
				next={fetchMovies}
				hasMore={hasMore && Object.keys(query).length && !showSelected}
				scrollableTarget={isBrowser ? 'scroller' : ''}
			>
				{Object.keys(query).length > 0 &&
				query.type === 'search' &&
				movies.length === 0 &&
				!isLoading && (
					<p style={{ textAlign: 'center' }}>No movies named "{query.params.query}" could be found</p>
				)}
				<MovieList
					mode={'find'}
					movies={showSelected ? selectedMovies : movies}
					isLoading={isLoading}
					toggleShowSelected={toggleShowSelected}
					selectLimit={20}
				/>
			</InfiniteScroll>
		</div>
	);
}
