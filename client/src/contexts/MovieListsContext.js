import React, { createContext, useState, useContext } from 'react';
import { UserDataContext } from './UserDataContext';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

export const MovieListsContext = createContext();

export function MovieListsProvider(props) {
	const { notifySuccess } = useContext(UserDataContext);
	const [ selectedMovies, setSelectedMovies ] = useState([]);
	const [ movieLists, setMovieLists ] = useLocalStorageState('movieLists', []);
	const [ editList, setEditList ] = useState('');
	const addMovie = (movie) => setSelectedMovies([ ...selectedMovies, movie ]);
	const toggleMovie = (movie) => {
		if (selectedMovies.every((m) => m.id !== movie.id)) {
			setSelectedMovies([ ...selectedMovies, { ...movie } ]);
		} else {
			setSelectedMovies(selectedMovies.filter((m) => m.id !== movie.id));
		}
	};
	const saveMovies = (listName) => {
		const listId = listName.toLowerCase().replace(/ /g, '-');
		setMovieLists([ ...movieLists, { movies: [ ...selectedMovies ], id: listId, name: listName } ]);
		setSelectedMovies([]);
		notifySuccess(`Saved ${listName}`);
	};
	const deleteMovieList = (id) => setMovieLists(movieLists.filter((ml) => ml.id !== id));
	const clearSelectedMovies = () => setSelectedMovies([]);
	const selectMovieList = (id) => setSelectedMovies(movieLists.find((ml) => ml.id === id).movies);
	const updateMovieList = (id) => {
		setMovieLists(movieLists.map((ml) => (ml.id === id ? { ...ml, movies: [ ...selectedMovies ] } : ml)));
		clearSelectedMovies([]);
	};
	const addToMovieList = (id) => {
		const oldMovieList = movieLists.find((ml) => ml.id === id);
		const moviesToAdd = selectedMovies.filter((sm) => !oldMovieList.movies.find((om) => om.id === sm.id));
		const newMovieList = { ...oldMovieList, movies: [ ...oldMovieList.movies, ...moviesToAdd ] };
		setMovieLists(movieLists.map((ml) => (ml.id === id ? newMovieList : ml)));
	};

	return (
		<MovieListsContext.Provider
			value={{
				selectedMovies,
				clearSelectedMovies,
				addMovie,
				toggleMovie,
				saveMovies,
				movieLists,
				selectMovieList,
				deleteMovieList,
				updateMovieList,
				addToMovieList,
				editList,
				setEditList
			}}
		>
			{props.children}
		</MovieListsContext.Provider>
	);
}
