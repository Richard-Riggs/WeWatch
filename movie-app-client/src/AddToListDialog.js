import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { MovieListsContext } from './contexts/MovieListsContext';
import { UserDataContext } from './contexts/UserDataContext';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import useStyles from './styles/SaveDialogStyles';
import { DialogContent } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';

export default function AddToListDialog({ open, setStage }) {
	const { movieLists, addToMovieList, clearSelectedMovies, selectedMovies } = useContext(MovieListsContext);
	const { notifyUser } = useContext(UserDataContext);
	const [ openTooltip, setOpenTooltip ] = useState('');
	const handleClose = () => setStage('');
	const classes = useStyles();
	const handleSave = (movieList) => {
		addToMovieList(movieList.id);
		setStage('');
		notifyUser({ severity: 'success', message: `Saved ${movieList.name}` });
		clearSelectedMovies();
	};
	return (
		<Dialog className={classes.root} onClose={handleClose} open={open} fullWidth maxWidth="xs">
			<DialogTitle className={classes.title}>Select a Movie List to Update</DialogTitle>
			<DialogContent>
				<List>
					{movieLists.map((ml) => (
						<Tooltip
							title="Movie lists cannot contain more than 20 movies"
							open={openTooltip === ml.id && selectedMovies.length + ml.movies.length > 20}
							onOpen={() => {
								setOpenTooltip(ml.id);
							}}
							onClose={() => setOpenTooltip('')}
							enterTouchDelay={0}
							placement="top-start"
							arrow
						>
							<span>
								<ListItem
									button
									disabled={selectedMovies.length + ml.movies.length > 20}
									alignItems="flex-start"
									onClick={() => handleSave(ml)}
								>
									<ListItemAvatar>
										<Avatar
											variant="rounded"
											src={`https://image.tmdb.org/t/p/w45${ml.movies[0].poster_path}`}
										/>
									</ListItemAvatar>
									<ListItemText primary={ml.name} secondary={`${ml.movies.length} Movies`} />
								</ListItem>
							</span>
						</Tooltip>
					))}
				</List>
			</DialogContent>
		</Dialog>
	);
}
