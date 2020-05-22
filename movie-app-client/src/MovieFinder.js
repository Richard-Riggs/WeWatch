import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import FinderForm from './FinderForm';
import MovieList from './MovieList';
import { render } from 'react-dom';

import InfiniteScroll from 'react-infinite-scroll-component';

export default function MovieFinder() {
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
		<div>
			<FinderForm />
			<InfiniteScroll
				dataLength={movies.length}
				next={fetchMovies}
				hasMore={!(movies.length > 40)}
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
