import React, { useContext, useState } from 'react';
import useStyles from './styles';
import LinkRoundedIcon from '@material-ui/icons/LinkRounded';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { VoteSessionContext } from '../../contexts/VoteSessionContext';
import { UserDataContext } from '../../contexts/UserDataContext';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

export default function VotingLobby() {
	const { movieList, userCount, isLeader, startVote, terminateSession } = useContext(VoteSessionContext);
	const { notifyUser } = useContext(UserDataContext);
	const classes = useStyles();
	const [ openTooltip, setOpenTooltip ] = useState(false);
	const handleToolTipOpen = () => setOpenTooltip(true);
	const handleToolTipClose = () => setOpenTooltip(false);

	const handleLinkShare = () => {
		notifyUser({ severity: 'info', message: 'Lobby Link Copied to Clipboard' });
	};

	return (
		<div className={classes.root}>
			<header>
				<h1>{movieList.name}</h1>
				<h2>Voting Lobby</h2>
			</header>
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
				<CopyToClipboard text={window.location.href} onCopy={handleLinkShare}>
					<Button
						className={classes.shareBtn}
						size="small"
						variant="contained"
						color="primary"
						startIcon={<LinkRoundedIcon />}
					>
						Share Link
					</Button>
				</CopyToClipboard>
			</div>

			{isLeader && (
				<div className={classes.leaderSection}>
					<h2>You are the lobby leader</h2>
					<div className={classes.leaderBtns}>
						<Tooltip
							title="At least 2 people must be in the lobby to start"
							open={openTooltip && userCount < 2}
							onOpen={handleToolTipOpen}
							onClose={handleToolTipClose}
							disableFocusListener
							enterTouchDelay={0}
						>
							<span>
								<Button
									className={classes.startVoteBtn}
									variant="contained"
									color="secondary"
									onClick={startVote}
									disabled={userCount < 2}
									startIcon={<CheckRoundedIcon />}
								>
									Start Vote
								</Button>
							</span>
						</Tooltip>

						<Button
							className={classes.cancelBtn}
							variant="outlined"
							onClick={terminateSession}
							startIcon={<ClearRoundedIcon />}
						>
							Cancel
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
