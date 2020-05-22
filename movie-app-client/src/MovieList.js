import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import MovieCard from './MovieCard';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Divider from '@material-ui/core/Divider';
import useToggleState from './hooks/useToggleState';
import sizes from './styles/sizes';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MovieRatings from './MovieRatings';
import MovieInfoDialog from './MovieInfoDialog';

const useStyles = makeStyles((theme) => ({
	gridContainer: {
		maxWidth: '100%',
		margin: 0
	},
	gridItem: {
		display: 'flex',
		boxSizing: 'content-box',
		maxWidth: '300px'
	},
	gridSkeleton: {
		backgroundColor: 'rgba(0,0,0,0.25)'
	}
}));

export default function MovieList({ movies, isLoading }) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [ showInfo, toggleInfo ] = useToggleState(false);
	const [ movieInfo, setMovieInfo ] = useState('');

	const med = useMediaQuery(theme.breakpoints.down('md'));

	const openInfo = (id) => {
		setMovieInfo(movies.find((m) => m.id === id));
		toggleInfo();
	};
	const closeInfo = () => toggleInfo();

	return (
		<div>
			<Grid className={classes.gridContainer} container justify="space-around" spacing={3}>
				{movies.map((m) => <MovieCard {...m} key={m.id} openInfo={openInfo} />)}
				{isLoading &&
					[ ...Array(10) ].map((n, i) => (
						<Grid item xs className={classes.gridItem} style={{ display: 'block' }} key={`skel${i}`}>
							<Skeleton
								className={classes.gridSkeleton}
								variant="rect"
								style={{ width: '300px', height: '450px' }}
							/>
							<Skeleton className={classes.gridSkeleton} variant="text" width={300} height={100} />
						</Grid>
					))}
				<MovieInfoDialog showInfo={showInfo} closeInfo={closeInfo} movieInfo={movieInfo} />
			</Grid>
		</div>
	);
}
