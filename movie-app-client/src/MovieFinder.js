import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import FinderForm from './FinderForm';
import MovieList from './MovieList';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './styles/MovieFinderStyles';
import { MovieListsContext } from './contexts/MovieListsContext';
import useToggleState from './hooks/useToggleState';
import Navbar from './Navbar';
import MovieFinderNav from './MovieFinderNav';

export default function MovieFinder() {
	const { selectedMovies, clearSelectedMovies } = useContext(MovieListsContext);
	const theme = useTheme();
	const classes = useStyles(theme);
	const [ movies, setMovies ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ query, setQuery ] = useState({});
	const [ resultsPage, setResultsPage ] = useState(0);
	const [ totalPages, setTotalPages ] = useState(0);
	const [ showSelected, setShowSelected ] = useState(false);
	const [ hasMore, setHasMore ] = useState(false);
	const toggleShowSelected = () => setShowSelected(!showSelected);

	const fetchMovies = async () => {
		if (Object.keys(query).length) {
			setIsLoading(true);
			const nextPage = resultsPage + 1;
			const response = await axios.get(`/api/movies/${query.type}`, {
				params: { ...query.params, page: nextPage }
			});
			if (response.data.movies.length) setMovies([ ...movies, ...response.data.movies ]);
			setResultsPage(nextPage);
			setTotalPages(response.data.totalPages);
			setHasMore(!(movies.length >= 500) && response.data.totalPages > 0 && nextPage < response.data.totalPages);
			setIsLoading(false);
		}
	};

	// Clears movie selection when leaving page
	useEffect(() => {
		return () => {
			clearSelectedMovies();
		};
	}, []);

	// This useEffect chain is used to ensure that the movies and resultsPage state resets
	// BEFORE processing the new query. Otherwise, the old movies are not removed.
	useEffect(
		() => {
			setTotalPages(0);
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
		[ movies ]
	);

	useEffect(
		() => {
			if (selectedMovies.length === 0) {
				setShowSelected(false);
			}
		},
		[ selectedMovies ]
	);

	return (
		<div className={classes.root}>
			<Navbar>
				<MovieFinderNav />
			</Navbar>
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
			>
				{Object.keys(query).length > 0 &&
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
