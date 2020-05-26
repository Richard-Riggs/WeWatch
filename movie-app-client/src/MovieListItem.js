import React, { useState } from 'react';
import useStyles from './styles/MovieListItemStyles';
import MovieListAvatar from './MovieListAvatar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import DeleteListDialog from './DeleteListDialog';

export default function MovieListItem({ movieList }) {
	const [ openDeleteDialog, setOpenDeleteDialog ] = useState(false);
	const handleDeleteOpen = () => setOpenDeleteDialog(true);

	const classes = useStyles();
	const handleDelete = () => handleDeleteOpen();
	return (
		<li className={classes.root}>
			<MovieListAvatar list={movieList.movies} />
			<h1 className={classes.movieListItemTitle}>Movie List Title</h1>
			<IconButton onClick={handleDelete}>
				<DeleteIcon />
			</IconButton>
			<DeleteListDialog id={movieList.id} open={openDeleteDialog} setOpen={setOpenDeleteDialog} />
		</li>
	);
}
