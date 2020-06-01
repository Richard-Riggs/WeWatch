import React, { useContext } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import useStyles from './styles/DeleteListDialogStyles';
import { MovieListsContext } from './contexts/MovieListsContext';

export default function DeleteListDialog({ id, name, open, setOpen }) {
	const { deleteMovieList } = useContext(MovieListsContext);
	const classes = useStyles();
	const handleClose = () => setOpen(false);
	const handleDelete = () => {
		setOpen(false);
		deleteMovieList(id);
	};
	return (
		<Dialog className={classes.root} open={open} onClose={handleClose}>
			<DialogTitle>Delete {name} ?</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">This action cannot be undone.</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} variant="contained">
					Cancel
				</Button>
				<Button onClick={handleDelete} variant="contained" color="secondary">
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
}
