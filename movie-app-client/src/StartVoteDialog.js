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
import Divider from '@material-ui/core/Divider';
import { UserDataContext } from './contexts/UserDataContext';
import { Link } from 'react-router-dom';
import useStyles from './styles/StartVoteDialogStyles';

export default function StartVoteDialog({ open, setOpen }) {
	const { movieLists } = useContext(MovieListsContext);
	const { initiateVote } = useContext(UserDataContext);
	const handleClose = () => setOpen(false);
	const classes = useStyles();
	return (
		<Dialog className={classes.root} onClose={handleClose} open={open} fullWidth maxWidth="xs">
			<DialogTitle className={classes.title}>Select a Movie List to Vote On</DialogTitle>
			<List>
				{movieLists.length ? (
					movieLists.map((ml) => (
						<ListItem
							button
							onClick={() => {
								initiateVote(ml);
								setOpen(false);
							}}
							alignItems="flex-start"
						>
							<ListItemAvatar>
								<Avatar
									variant="rounded"
									src={`https://image.tmdb.org/t/p/w45${ml.movies[0].poster_path}`}
								/>
							</ListItemAvatar>
							<ListItemText primary={ml.name} secondary={`${ml.movies.length} Movies`} />
						</ListItem>
					))
				) : (
					<ListItem className={classes.noLists}>
						<ListItemText primary="You don't have any movie lists" />
					</ListItem>
				)}
				<Divider />
				<ListItem button component={Link} to="/find">
					<ListItemAvatar>
						<Avatar>
							<AddIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText primary="Create New List" />
				</ListItem>
			</List>
		</Dialog>
	);
}
