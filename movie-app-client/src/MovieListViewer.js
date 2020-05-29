import React, { useContext } from 'react';
import MovieList from './MovieList';
import { MovieListsContext } from './contexts/MovieListsContext';

export default function MovieListViewer(props) {
	const listId = props.match.params.listId;
	const { movieLists } = useContext(MovieListsContext);
	const movieList = movieLists.find((ml) => ml.id === listId);
	return (
		<div>
			<h1>Viewing movies in {listId}</h1>
			<MovieList view movies={movieList.movies} />
		</div>
	);
}
