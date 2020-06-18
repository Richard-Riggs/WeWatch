import React, { useState, useEffect, useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { CustomThemeContext } from './contexts/CustomThemeContext';
import { MovieListsContext } from './contexts/MovieListsContext';
import { VoteSessionContext } from './contexts/VoteSessionContext';
import useStyles from './styles/NavbarStyles';
import { withRouter } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Prompt } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

export default function MovieVoterNav() {
	const { selectedMovies, clearSelectedMovies } = useContext(MovieListsContext);
	const { submitVote, movieList, stage, voteLimit, isLeader } = useContext(VoteSessionContext);
	const numSelected = selectedMovies.length;
	const theme = useTheme();
	const classes = useStyles(theme);
	const { isDarkMode, toggleTheme } = useContext(CustomThemeContext);
	const [ openVotedDialog, setOpenVotedDialog ] = useState(false);
	const [ openTiebreakerDialog, setOpenTieBreakerDialog ] = useState(false);

	const handleVote = () => {
		submitVote();
		setOpenVotedDialog(true);
	};

	const closeTiebreakerDialog = () => setOpenTieBreakerDialog(false);

	useEffect(
		() => {
			if (stage === 'results') {
				setOpenVotedDialog(false);
			}
		},
		[ stage ]
	);

	useEffect(
		() => {
			if (stage === 'vote' || stage === 'revote') {
				setOpenVotedDialog(false);
				setOpenTieBreakerDialog(true);
			}
		},
		[ movieList ]
	);

	return (
		<React.Fragment>
			<Prompt
				when={isLeader && stage !== 'terminate'}
				message={(location, action) => {
					console.log(location);
					console.log(action);
					return 'Leaving this page will close the voting lobby. Are you sure you want to continue?';
				}}
			/>
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
						onClick={handleVote}
						startIcon={<CheckRoundedIcon />}
						disabled={numSelected !== voteLimit}
					>
						Submit
					</Button>
					<Button
						className={classes.navButton}
						variant="contained"
						color="primary"
						startIcon={<ClearRoundedIcon />}
						onClick={clearSelectedMovies}
					>
						Clear
					</Button>
				</div>
			</CSSTransition>
			<Dialog open={openVotedDialog} disableEscapeKeyDown disableBackdropClick>
				<DialogTitle style={{ textAlign: 'center' }}>
					<h2>Vote Submitted!</h2>
				</DialogTitle>
				<DialogContent>
					<DialogContentText style={{ fontSize: '1.2rem', textAlign: 'center' }}>
						Your movie selection has been successfully submitted. Waiting for everyone else to finish
						voting...
					</DialogContentText>
				</DialogContent>
			</Dialog>
			<Dialog
				open={openTiebreakerDialog}
				onClose={closeTiebreakerDialog}
				disableEscapeKeyDown
				disableBackdropClick
			>
				<DialogTitle style={{ textAlign: 'center' }}>
					<h2>Tiebreaker!</h2>
				</DialogTitle>
				<DialogContent>
					<DialogContentText style={{ fontSize: '1.2rem', textAlign: 'center' }}>
						The last vote resulted in a tie between {movieList && movieList.movies.length} movies. A new
						vote has been initiated to resolve the tie. Please select {voteLimit} of these movies to watch.
					</DialogContentText>
				</DialogContent>
				<DialogActions style={{ justifyContent: 'center' }}>
					<Button
						onClick={closeTiebreakerDialog}
						color="secondary"
						variant="contained"
						size="large"
						autoFocus
					>
						Continue
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
