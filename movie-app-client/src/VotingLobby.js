import React from 'react';
import useStyles from './styles/VotingLobbyStyles';
import Button from '@material-ui/core/Button';

export default function VotingLobby({ movieList, userCount, isLeader }) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<h1>
				Voting Lobby for <strong>{movieList.name}</strong>
			</h1>
			<div className={classes.lobbyInfo}>
				<span>
					{userCount} {userCount === 1 ? 'person' : 'people'} in lobby
				</span>
				<span>{movieList.movies.length} movies in vote</span>
			</div>
			<div className={classes.instructions}>
				<h3>Instructions</h3>
				<p>
					Once the vote begins, select the movies that you're most interested in watching. You are allowed to
					select up to 5 movies. When you've finished selecting your preferred movies, press the 'Vote' button
					to submit your movie selection. The winner will be determined as soon as everyone in the lobby has
					finished voting.
				</p>
			</div>
			{isLeader && (
				<div className={classes.leaderSection}>
					<h2>You are the lobby leader</h2>
					<div className={classes.leaderBtns}>
						<Button size="large" variant="contained" color="secondary">
							Start Vote
						</Button>
						<Button size="large" variant="outlined" color="default">
							Cancel Vote
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
