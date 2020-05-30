import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import FinderForm from './FinderForm';
import MovieList from './MovieList';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './styles/MovieFinderStyles';
import { MovieListsContext } from './contexts/MovieListsContext';
import useToggleState from './hooks/useToggleState';

export default function MovieFinder() {
	const { selectedMovies, clearSelectedMovies } = useContext(MovieListsContext);
	const theme = useTheme();
	const classes = useStyles(theme);
	const [ movies, setMovies ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ query, setQuery ] = useState({});
	const [ resultsPage, setResultsPage ] = useState(0);
	const [ showSelected, toggleShowSelected ] = useToggleState(false);

	const fetchMovies = async () => {
		if (Object.keys(query).length) {
			setIsLoading(true);
			const nextPage = resultsPage + 1;
			const response = await axios.get(`/api/movieDB/${query.type}`, {
				params: { ...query.params, page: nextPage }
			});
			setMovies([ ...movies, ...response.data ]);
			setResultsPage(nextPage);
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
			setResultsPage(0);
			setMovies([]);
		},
		[ query ]
	);
	useEffect(
		() => {
			if (movies.length === 0) {
				(async () => await fetchMovies())();
			}
		},
		[ movies ]
	);

	return (
		<div className={classes.root}>
			<FinderForm setQuery={setQuery} />
			<InfiniteScroll
				dataLength={movies.length}
				next={fetchMovies}
				hasMore={!showSelected && !(movies.length >= 40)}
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b>Yay! You have seen it all</b>
					</p>
				}
			>
				<MovieList
					mode={'find'}
					movies={showSelected ? selectedMovies : movies}
					isLoading={isLoading}
					showSelected={showSelected}
					toggleShowSelected={toggleShowSelected}
				/>
			</InfiniteScroll>
		</div>
	);
}
