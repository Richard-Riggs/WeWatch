import React, { useState, useContext } from 'react';
import useStyles from './styles/MovieListItemStyles';
import MovieListAvatar from './MovieListAvatar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteListDialog from './DeleteListDialog';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from 'react-router';
import { UserDataContext } from './contexts/UserDataContext';
import Grid from '@material-ui/core/Grid';

function MovieListItem({ history, movieList }) {
	const { clientId } = useContext(UserDataContext);
	const [ openDeleteDialog, setOpenDeleteDialog ] = useState(false);
	const handleDeleteOpen = () => setOpenDeleteDialog(true);

	const classes = useStyles();
	const handleDelete = () => handleDeleteOpen();

	const handleVote = async () => {
		const response = await axios.post('/api/vote', {
			movieList: movieList,
			clientId: clientId
		});
		history.push(`/vote/${response.data.sessionId}`);
	};

	return (
		<Grid item xs={'auto'}>
			<div className={classes.root}>
				<header>
					<MovieListAvatar list={movieList.movies} />
					<div className={classes.overlay}>
						<h1 className={classes.movieListItemTitle}>{movieList.name}</h1>
					</div>
				</header>
				<div className={classes.content}>
					<div className={classes.contentHeader}>
						<span>{movieList.movies.length} Movies</span>
						<IconButton onClick={handleDelete} size="small">
							<DeleteIcon color="default" fontSize="small" />
						</IconButton>
					</div>
					<div className={classes.actionBtns}>
						<Link to={`/movie-lists/${movieList.id}`}>
							<Button variant="contained" size="small">
								View
							</Button>
						</Link>
						<Button variant="contained" size="small" onClick={handleVote}>
							Vote
						</Button>
					</div>

					<DeleteListDialog
						id={movieList.id}
						name={movieList.name}
						open={openDeleteDialog}
						setOpen={setOpenDeleteDialog}
					/>
				</div>
			</div>
		</Grid>
	);
}

export default withRouter(MovieListItem);
