import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import FinderForm from './FinderForm';
import MovieList from './MovieList';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './styles/MovieFinderStyles';

export default function MovieFinder() {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [ movies, setMovies ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ queryParams, setQueryParams ] = useState({
		language: 'en-US',
		sort_by: 'popularity.desc',
		include_adult: false,
		include_video: false,
		page: 0
	});

	const fetchMovies = async () => {
		setIsLoading(true);
		const newPage = queryParams.page + 1;
		const response = await axios.get('/api/movieDB', {
			params: { ...queryParams, page: newPage }
		});
		setMovies([ ...movies, ...response.data ]);
		setQueryParams({ ...queryParams, page: newPage });
		setIsLoading(false);
	};

	useEffect(() => {
		fetchMovies();
	}, []);

	return (
		<div className={classes.root}>
			<FinderForm />
			<InfiniteScroll
				dataLength={movies.length}
				next={fetchMovies}
				hasMore={!(movies.length >= 40)}
				endMessage={
					<p style={{ textAlign: 'center' }}>
						<b>Yay! You have seen it all</b>
					</p>
				}
			>
				<MovieList movies={movies} isLoading={isLoading} />
			</InfiniteScroll>
		</div>
	);
}
