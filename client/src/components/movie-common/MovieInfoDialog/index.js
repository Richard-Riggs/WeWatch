import React from 'react';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MovieRatings from '../MovieRatings';
import useStyles from './styles';

export default function MovieInfoDialog(props) {
	const { showInfo, closeInfo, movieInfo } = props;
	const classes = useStyles(props);
	const releaseDate = new Date(movieInfo.release_date);
	return (
		<Dialog open={showInfo} onClose={closeInfo} fullWidth maxWidth={'lg'}>
			<Box className={classes.infoDialog}>
				<div className={classes.infoPoster} />
				<DialogContent className={classes.DialogContent}>
					<DialogTitle className={classes.DialogTitle} disableTypography={true}>
						<Typography variant="h4">{movieInfo.title}</Typography>
						<IconButton className={classes.closeButton} aria-label="close" onClick={closeInfo}>
							<CloseIcon />
						</IconButton>
					</DialogTitle>
					<Divider />
					<div className={classes.DialogContentText}>
						<Box className={classes.infoRow} style={{ alignItems: 'center' }}>
							<div className={classes.infoRowHeader}>Ratings</div>
							<MovieRatings ratings={movieInfo.ratings} id={movieInfo.id} justifyContent="flex-start" />
						</Box>
						<Box className={classes.infoRow}>
							<div className={classes.infoRowHeader}>Release Date</div>
							<p>{`${releaseDate.toLocaleString('default', {
								month: 'long',
								day: 'numeric',
								year: 'numeric'
							})}`}</p>
						</Box>
						<Box className={classes.infoRow}>
							<div className={classes.infoRowHeader}>Runtime</div>
							<p>{movieInfo.runtime}</p>
						</Box>
						<Box className={classes.infoRow}>
							<div className={classes.infoRowHeader}>Genre</div>
							<p>{movieInfo.genre}</p>
						</Box>
						<Box className={classes.infoRow}>
							<div className={classes.infoRowHeader}>Director(s)</div>
							<p>{movieInfo.director}</p>
						</Box>
						<Box className={classes.infoRow}>
							<div className={classes.infoRowHeader}>Writer(s)</div>
							<p>{movieInfo.writer}</p>
						</Box>
						<Box className={classes.infoRow}>
							<div className={classes.infoRowHeader}>Actors</div>
							<p>{movieInfo.actors}</p>
						</Box>
						<Box className={classes.infoRow}>
							<div className={classes.infoRowHeader}>Overview</div>
							<p>{movieInfo.overview}</p>
						</Box>
					</div>
				</DialogContent>
			</Box>
		</Dialog>
	);
}
