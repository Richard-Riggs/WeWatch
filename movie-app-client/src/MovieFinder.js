import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import FinderForm from './FinderForm';
import MovieList from './MovieList';

export default function MovieFinder() {
	const [ movies, setMovies ] = useState([]);
	const [ queryParams, setQueryParams ] = useState({
		language: 'en-US',
		sort_by: 'popularity.desc',
		include_adult: false,
		include_video: false,
		page: 1
	});

	const fetchMovies = async () => {
		const response = await axios.get('/api/movieDB', {
			params: { ...queryParams }
		});
		setMovies([ ...movies, ...response.data ]);
	};

	useEffect(() => {
		fetchMovies();
	}, []);

	return (
		<div>
			<FinderForm />
			<MovieList movies={movies} />
		</div>
	);
}
