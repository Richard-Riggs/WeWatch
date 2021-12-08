import React, { useState, useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import useStyles from './styles';
import SaveListDialog from '../../movie-list/SaveListDialog';
import { CSSTransition } from 'react-transition-group';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import SaveOptionsDialog from '../SaveOptionsDialog';
import { MovieListsContext } from '../../../contexts/MovieListsContext';
import AddToListDialog from '../../movie-list/AddToListDialog';

export default function MovieFinderNav() {
	const { selectedMovies, clearSelectedMovies, movieLists } = useContext(MovieListsContext);
	const numSelected = selectedMovies.length;
	const theme = useTheme();
	const classes = useStyles(theme);
	const [ stage, setStage ] = useState('');
	const handleOpenSave = () => {
		if (movieLists.length) setStage('options');
		else setStage('newList');
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
						className={classes.saveBtn}
						variant="contained"
						color="secondary"
						onClick={handleOpenSave}
						startIcon={<SaveIcon />}
					>
						Save
					</Button>
					<Button
						className={classes.editBtn}
						variant="outlined"
						onClick={clearSelectedMovies}
						startIcon={<ClearRoundedIcon />}
					>
						Clear
					</Button>
				</div>
			</CSSTransition>
			<SaveOptionsDialog open={stage === 'options'} setStage={setStage} />
			<SaveListDialog open={stage === 'newList'} setStage={setStage} />
			<AddToListDialog open={stage === 'addToList'} setStage={setStage} />
		</React.Fragment>
	);
}
