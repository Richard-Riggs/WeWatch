import React, { useState, useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { MovieListsContext } from './contexts/MovieListsContext';
import { UserDataContext } from './contexts/UserDataContext';
import useStyles from './styles/NavbarStyles';
import SaveListDialog from './SaveListDialog';
import { CSSTransition } from 'react-transition-group';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

export default function MovieViewerNav({ movieList, edit, toggleEdit }) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const { selectedMovies, updateMovieList } = useContext(MovieListsContext);
	const { notifyUser } = useContext(UserDataContext);
	const numSelected = selectedMovies.length;
	const [ openSave, setOpenSave ] = useState(false);
	const handleListSave = () => {
		updateMovieList(movieList.id);
		toggleEdit();
		notifyUser({ severity: 'success', message: `Updated ${movieList.name}` });
	};

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
						className={`${classes.navButton} ${classes.saveBtn}`}
						variant="contained"
						onClick={handleListSave}
						startIcon={<SaveIcon />}
					>
						Save
					</Button>
				</div>
			</CSSTransition>
			<Button
				className={classes.editBtn}
				variant="outlined"
				color="default"
				onClick={toggleEdit}
				startIcon={edit ? <ClearRoundedIcon /> : <EditRoundedIcon />}
			>
				{edit ? 'Cancel' : 'Edit'}
			</Button>

			<SaveListDialog open={openSave} setOpen={setOpenSave} />
		</React.Fragment>
	);
}
