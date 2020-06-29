import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MovieListsContext } from '../../contexts/MovieListsContext';
import { withRouter } from 'react-router';
import useStyles from './styles';

function SaveListDialog({ open, setStage, history }) {
	const { saveMovies, movieLists } = useContext(MovieListsContext);
	const [ nameInput, setNameInput ] = useState('');
	const [ isValid, setIsValid ] = useState(true);
	const classes = useStyles();
	const handleClose = () => setStage('');
	const handleChange = (e) => {
		if (e.target.value.length < 50) {
			setNameInput(e.target.value);
		}
	};

	const nameIsUnique = (name) => {
		return movieLists.every(
			(ml) => ml.name.toLowerCase().replace(/ /g, '-') !== name.toLowerCase().replace(/ /g, '-')
		);
	};

	const handleSave = (e) => {
		e.preventDefault();
		if (nameIsUnique(nameInput)) {
			saveMovies(nameInput);
			setStage('');
			setNameInput('');
			history.push('/');
		} else {
			setIsValid(false);
		}
	};

	useEffect(() => setIsValid(true), [ nameInput ]);

	return (
		<Dialog className={classes.root} open={open} onClose={handleClose} maxWidth="sm" fullWidth>
			<DialogTitle className={classes.title}>Save New List</DialogTitle>
			<form onSubmit={handleSave}>
				<DialogContent>
					<DialogContentText>Please enter a name for your new list.</DialogContentText>
					<TextField
						error={!isValid}
						autoFocus
						required
						id="name"
						label="List Name"
						type="text"
						fullWidth
						value={nameInput}
						onChange={handleChange}
						helperText={isValid ? '50 character limit' : 'List name must be unique'}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button
						className={classes.saveBtn}
						color="primary"
						startIcon={<SaveIcon />}
						variant="contained"
						color="secondary"
						type="submit"
					>
						Save List
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default withRouter(SaveListDialog);
