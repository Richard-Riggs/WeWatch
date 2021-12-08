import React, { useContext } from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import { MovieListsContext } from '../../contexts/MovieListsContext';
import Divider from '@material-ui/core/Divider';
import { VoteSessionContext } from '../../contexts/VoteSessionContext';
import { Link } from 'react-router-dom';
import useStyles from './styles';

export default function StartVoteDialog({ open, setOpen }) {
	const { movieLists } = useContext(MovieListsContext);
	const { initiateVoteSession } = useContext(VoteSessionContext);
	const handleClose = () => setOpen(false);
	const classes = useStyles();
	return (
		<Dialog className={classes.root} onClose={handleClose} open={open} fullWidth maxWidth="xs">
			<DialogTitle className={classes.title}>Select a Movie List to Vote On</DialogTitle>
			<List>
				{movieLists.length ? (
					movieLists.map((ml) => (
						<ListItem
							key={`start-vote-${ml.id}`}
							button
							onClick={() => {
								initiateVoteSession(ml);
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
				<ListItem button component={Link} to="/find" onClick={handleClose}>
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
