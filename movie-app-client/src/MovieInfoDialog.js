import React, { useState } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import sizes from './styles/sizes';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MovieRatings from './MovieRatings';

const useStyles = makeStyles((theme) => ({
	infoDialog: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		maxHeight: '100%',
		[sizes.up('sm')]: {
			flexDirection: 'row',
			alignItems: 'flex-start'
		}
	},
	infoPoster: {
		display: 'none',
		flexGrow: 0,
		objectFit: 'cover',
		[sizes.up('sm')]: {
			width: '300px',
			height: '450px',
			display: 'block'
		},
		[sizes.up('lg')]: {
			width: '500px',
			height: '750px'
		}
	},
	DialogContent: {
		padding: 0,
		display: 'flex',
		flexDirection: 'column',
		height: '450px',
		maxHeight: '450px',
		[sizes.up('lg')]: {
			height: '750px',
			maxHeight: '750px'
		}
	},
	DialogTitle: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	closeButton: {
		height: '48px'
	},
	DialogContentText: {
		padding: '0.5rem 1.5rem',
		color: 'black',
		overflow: 'auto',
		flexGrow: 1
	},
	infoRow: {
		display: 'flex',
		alignItems: 'flex-start',
		flexWrap: 'noWrap',
		minHeight: '32px',
		fontWeight: 'normal',
		color: theme.palette.text.secondary
	},
	infoRowHeader: {
		width: '100px',
		margin: 0,
		flexShrink: 0,
		fontWeight: 'bold',
		color: theme.palette.text.primary
	}
}));

export default function MovieInfoDialog({ showInfo, closeInfo, movieInfo }) {
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<Dialog open={showInfo} onClose={closeInfo} fullWidth maxWidth={'lg'}>
			<Box className={classes.infoDialog}>
				<img className={classes.infoPoster} src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}`} />
				<DialogContent className={classes.DialogContent}>
					<DialogTitle className={classes.DialogTitle} disableTypography={true}>
						<Typography variant="h4">{movieInfo.title}</Typography>
						<IconButton className={classes.closeButton} aria-label="close" onClick={closeInfo}>
							<CloseIcon />
						</IconButton>
					</DialogTitle>
					<Divider />
					<div className={classes.DialogContentText}>
						<Box className={classes.infoRow} pb={1} style={{ alignItems: 'center' }}>
							<div className={classes.infoRowHeader}>Ratings</div>
							<MovieRatings ratings={movieInfo.ratings} id={movieInfo.id} justifyContent="flex-start" />
						</Box>
						<Box className={classes.infoRow} pb={1}>
							<div className={classes.infoRowHeader}>Genre</div>
							<p>{movieInfo.genre}</p>
						</Box>
						<Box className={classes.infoRow} pb={1}>
							<div className={classes.infoRowHeader}>Director</div>
							<p>{movieInfo.director}</p>
						</Box>
						<Box className={classes.infoRow} pb={1}>
							<div className={classes.infoRowHeader}>Writer</div>
							<p>{movieInfo.writer}</p>
						</Box>
						<Box className={classes.infoRow} pb={1}>
							<div className={classes.infoRowHeader}>Actors</div>
							<p>{movieInfo.actors}</p>
						</Box>
						<Box className={classes.infoRow}>
							<div className={classes.infoRowHeader}>Overview</div>
							<p>{movieInfo.overview}</p>
						</Box>
					</div>
					<Divider />
					<DialogActions>
						<Button onClick={closeInfo} color="primary">
							Cancel
						</Button>
						<Button onClick={closeInfo} color="primary">
							Subscribe
						</Button>
					</DialogActions>
				</DialogContent>
			</Box>
		</Dialog>
	);
}
