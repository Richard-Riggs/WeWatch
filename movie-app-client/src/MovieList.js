import React from 'react';
import MovieCard from './MovieCard';

export default function MovieList({ movies }) {
	return <div>{movies.map((m) => <MovieCard {...m} key={m.id} />)}</div>;
}
