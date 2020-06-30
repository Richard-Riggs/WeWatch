import React, { memo } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import MovieRatings from '../MovieRatings';
import useStyles from './styles';

function MovieCard(props) {
	const { movie, openInfo, disabled, selected, toggleAble, toggleMovie } = props;
	const { title, ratings, id } = movie;
	const classes = useStyles(props);
	const handleInfoClick = (e) => {
		e.stopPropagation();
		openInfo(id);
	};

	const handleCardClick = () => {
		if (toggleAble) {
			toggleMovie(movie);
		}
	};

	return (
		<Grid className={classes.gridItem} onClick={handleCardClick} item xs="auto">
			<Card
				elevation={8}
				className={`${classes.root} ${selected && classes.selected} ${disabled && classes.disabled}`}
			>
				<CardMedia className={classes.poster} component="div" alt={title} title={title} />
				<CheckCircleRoundedIcon className={classes.selectedIcon} fontSize="default" />
				<CardContent className={classes.cardContent}>
					<div className={classes.title}>
						<Typography gutterBottom variant="h6" component="h2">
							<span>{title}</span>
						</Typography>
						<IconButton className={classes.infoButton} size={'medium'} onClick={handleInfoClick}>
							<InfoIcon className={classes.icon} fontSize="large" />
						</IconButton>
					</div>

					{ratings && <MovieRatings ratings={ratings} id={id} />}
				</CardContent>
			</Card>
		</Grid>
	);
}

const areEqual = (prevProps, nextProps) => {
	if (
		prevProps.disabled === nextProps.disabled &&
		prevProps.selected === nextProps.selected &&
		prevProps.toggleAble === nextProps.toggleAble
	) {
		return true;
	}
	return false;
};

export default memo(MovieCard, areEqual);
