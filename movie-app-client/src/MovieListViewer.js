import React, { useContext, useState, useEffect } from 'react';
import MovieList from './MovieList';
import { MovieListsContext } from './contexts/MovieListsContext';
import Navbar from './Navbar';
import MovieViewerNav from './MovieViewerNav';
import useStyles from './styles/MovieListViewerStyles';
import { UserDataContext } from './contexts/UserDataContext';

export default function MovieListViewer(props) {
	const classes = useStyles();
	const listId = props.match.params.listId;
	const { movieLists, selectMovieList, clearSelectedMovies, updateMovieList, editList } = useContext(
		MovieListsContext
	);
	const movieList = movieLists.find((ml) => ml.id === listId);
	const { notifyUser } = useContext(UserDataContext);

	useEffect(() => {
		return () => {
			clearSelectedMovies();
		};
	}, []);
	return (
		<div className={classes.root}>
			<Navbar>
				<MovieViewerNav movieList={movieList} />
			</Navbar>
			<h1>{movieList.name}</h1>
			<MovieList mode={editList ? 'edit' : 'view'} movies={movieList.movies} />
		</div>
	);
}
