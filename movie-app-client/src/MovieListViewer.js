import React, { useContext, useState, useEffect } from 'react';
import MovieList from './MovieList';
import { MovieListsContext } from './contexts/MovieListsContext';
import Button from '@material-ui/core/Button';
import Navbar from './Navbar';
import MovieViewerNav from './MovieViewerNav';
import useStyles from './styles/MovieListViewerStyles';

export default function MovieListViewer(props) {
  const classes = useStyles();
  const listId = props.match.params.listId;
  const { movieLists, selectMovieList, clearSelectedMovies } = useContext(MovieListsContext);
  const movieList = movieLists.find((ml) => ml.id === listId);
  const [ edit, setEdit ] = useState(false);
  const toggleEdit = () => {
    if (!edit) {
      selectMovieList(listId);
      setEdit(true);
    } else {
      clearSelectedMovies();
      setEdit(false);
    }
  };
  useEffect(() => {
    return () => {
      clearSelectedMovies();
    };
  }, []);
  return (
    <div className={classes.root}>
      <Navbar>
        <MovieViewerNav edit={edit} toggleEdit={toggleEdit} movieList={movieList} />
      </Navbar>
      <h1>{movieList.name}</h1>
      <MovieList mode={edit ? 'edit' : 'view'} movies={movieList.movies} />
    </div>
  );
}
