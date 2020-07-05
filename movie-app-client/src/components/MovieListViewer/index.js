import React, { useContext } from 'react';
import MovieList from '../MovieList';
import { MovieListsContext } from '../../contexts/MovieListsContext';
import useStyles from './styles';

export default function MovieListViewer(props) {
	const classes = useStyles();
	const listId = props.match.params.listId;
	const { movieLists, editList } = useContext(MovieListsContext);
	const movieList = movieLists.find((ml) => ml.id === listId);

	return (
		<div className={classes.root}>
			<h1>{movieList.name}</h1>
			<MovieList mode={editList ? 'edit' : 'view'} movies={movieList.movies} />
		</div>
	);
}
