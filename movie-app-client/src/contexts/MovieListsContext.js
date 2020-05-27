import React, { createContext, useState } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

export const MovieListsContext = createContext();

export function MovieListsProvider(props) {
	const [ selectedMovies, setselectedMovies ] = useState([]);
	const [ movieLists, setMovieLists ] = useLocalStorageState('movieLists', []);
	const addMovie = (movie) => setselectedMovies([ ...selectedMovies, movie ]);
	const toggleMovie = (movie) => {
		if (selectedMovies.every((m) => m.id !== movie.id)) {
			setselectedMovies([ ...selectedMovies, { ...movie } ]);
		} else {
			setselectedMovies(selectedMovies.filter((m) => m.id !== movie.id));
		}
	};
	const saveMovies = (listName) => {
		const listId = listName.toLowerCase().replace(/ /g, '-');
		setMovieLists([ ...movieLists, { movies: [ ...selectedMovies ], id: listId, name: listName } ]);
		setselectedMovies([]);
	};
	const deleteMovieList = (id) => setMovieLists(movieLists.filter((ml) => ml.id !== id));
	return (
		<MovieListsContext.Provider
			value={{ selectedMovies, addMovie, toggleMovie, saveMovies, movieLists, deleteMovieList }}
		>
			{props.children}
		</MovieListsContext.Provider>
	);
}
