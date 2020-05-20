import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

export default function ListGenerator() {
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
		setMovies([ ...movies, ...response.data.results ]);
	};

	useEffect(() => {
		fetchMovies();
	}, []);

	return <div>{movies.map((m) => <MovieCard {...m} key={m.id} />)}</div>;
}
