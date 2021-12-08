import React, { useState, useContext } from 'react';
import useStyles from './styles';
import MovieListAvatar from '../MovieListAvatar';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteListDialog from '../DeleteListDialog';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { VoteSessionContext } from '../../../contexts/VoteSessionContext';
import Grid from '@material-ui/core/Grid';

function MovieListItem({ movieList }) {
	const { initiateVoteSession } = useContext(VoteSessionContext);
	const [ openDeleteDialog, setOpenDeleteDialog ] = useState(false);
	const handleDeleteOpen = () => setOpenDeleteDialog(true);

	const classes = useStyles();
	const handleDelete = () => handleDeleteOpen();

	const handleVote = () => initiateVoteSession(movieList);

	return (
		<Grid className={classes.GridItem} item xs={'auto'}>
			<div className={classes.root}>
				<header>
					<MovieListAvatar list={movieList.movies} id={movieList.id} />
					<div className={classes.overlay}>
						<h1 className={classes.movieListItemTitle}>{movieList.name}</h1>
					</div>
				</header>
				<div className={classes.content}>
					<div className={classes.contentHeader}>
						<span>{movieList.movies.length} Movies</span>
						<IconButton onClick={handleDelete} size="small">
							<DeleteIcon fontSize="small" />
						</IconButton>
					</div>
					<div className={classes.actionBtns}>
						<Link to={`/movie-lists/${movieList.id}`}>
							<Button className={classes.viewBtn} variant="outlined" color="primary" size="small">
								View
							</Button>
						</Link>
						<Button
							className={classes.voteBtn}
							variant="outlined"
							color="secondary"
							size="small"
							onClick={handleVote}
						>
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
