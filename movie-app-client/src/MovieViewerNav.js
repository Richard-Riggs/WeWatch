import React, { useState, useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { MovieListsContext } from './contexts/MovieListsContext';
import useStyles from './styles/NavbarStyles';
import SaveListDialog from './SaveListDialog';
import { CSSTransition } from 'react-transition-group';

export default function MovieViewerNav({ movieList, edit, toggleEdit }) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const { selectedMovies, updateMovieList } = useContext(MovieListsContext);
	const numSelected = selectedMovies.length;
	const [ openSave, setOpenSave ] = useState(false);
	const handleListSave = () => updateMovieList(movieList.id);

	return (
		<React.Fragment>
			<CSSTransition classNames="fade" in={numSelected > 0} timeout={200} appear mountOnEnter unmountOnExit>
				<div className={classes.listButtons}>
					<Typography variant="h6">
						<span className={classes.numSelected}>{numSelected}</span>
						<span className={classes.numSelectedInfo}>
							&nbsp;Movie{numSelected === 1 ? '' : 's'} Selected
						</span>
					</Typography>
					<Button
						className={classes.navButton}
						variant="contained"
						color="secondary"
						onClick={handleListSave}
						startIcon={<SaveIcon />}
					>
						Save
					</Button>
				</div>
			</CSSTransition>
			<Button className={classes.editBtn} variant="contained" onClick={toggleEdit}>
				{edit ? 'Cancel' : 'Edit'}
			</Button>

			<SaveListDialog open={openSave} setOpen={setOpenSave} />
		</React.Fragment>
	);
}
