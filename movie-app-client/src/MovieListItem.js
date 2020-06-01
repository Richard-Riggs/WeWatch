import React, { useState } from 'react';
import useStyles from './styles/MovieListItemStyles';
import MovieListAvatar from './MovieListAvatar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteListDialog from './DeleteListDialog';
import { Link } from 'react-router-dom';

export default function MovieListItem({ movieList }) {
	const [ openDeleteDialog, setOpenDeleteDialog ] = useState(false);
	const handleDeleteOpen = () => setOpenDeleteDialog(true);

	const classes = useStyles();
	const handleDelete = () => handleDeleteOpen();
	return (
		<li className={classes.root}>
			<MovieListAvatar list={movieList.movies} />
			<h1 className={classes.movieListItemTitle}>{movieList.name}</h1>
			<Link to={`/movie-lists/${movieList.id}`}>
				<Button variant="outlined">View</Button>
			</Link>

			<Button variant="outlined">Vote</Button>

			<IconButton onClick={handleDelete}>
				<DeleteIcon color="secondary" />
			</IconButton>
			<DeleteListDialog
				id={movieList.id}
				name={movieList.name}
				open={openDeleteDialog}
				setOpen={setOpenDeleteDialog}
			/>
		</li>
	);
}
