import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';
import useStyles from './styles/NavbarStyles';
import SaveListDialog from './SaveListDialog';
import { CSSTransition } from 'react-transition-group';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

export default function MovieFinderNav({ selectedMovies, clearSelectedMovies }) {
	const numSelected = selectedMovies.length;
	const theme = useTheme();
	const classes = useStyles(theme);
	const [ openSave, setOpenSave ] = useState(false);
	const handleOpenSave = () => setOpenSave(true);

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
						onClick={handleOpenSave}
						startIcon={<SaveIcon />}
					>
						Save
					</Button>
					<Button
						className={classes.navButton}
						variant="contained"
						color="default"
						onClick={clearSelectedMovies}
						startIcon={<ClearRoundedIcon />}
					>
						Clear
					</Button>
				</div>
			</CSSTransition>
			<SaveListDialog open={openSave} setOpen={setOpenSave} />
		</React.Fragment>
	);
}
