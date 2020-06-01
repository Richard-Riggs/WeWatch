import React, { memo, useContext, useState, useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import InfoIcon from '@material-ui/icons/Info';
import IconButton from '@material-ui/core/IconButton';
import MovieRatings from './MovieRatings';
import useStyles from './styles/MovieCardStyles';
import { MovieListsContext } from './contexts/MovieListsContext';
import useToggleState from './hooks/useToggleState';

function MovieCard({ movie, openInfo, selected, mode }) {
	const { title, poster_path, ratings, id, list_id } = movie;
	const theme = useTheme();
	const classes = useStyles(theme);
	const { toggleMovie } = useContext(MovieListsContext);
	const [ isSelected, setIsSelected ] = useState(list_id || selected ? true : false);
	const toggleIsSelected = () => setIsSelected(!isSelected);
	const imgSrc = `https://image.tmdb.org/t/p/w300${poster_path}`;

	const handleInfoClick = (e) => {
		e.stopPropagation();
		openInfo(id);
	};

	const handleCardClick = () => {
		if (mode !== 'view') {
			toggleMovie(movie);
			toggleIsSelected();
		}
	};

	useEffect(
		() => {
			if (mode === 'edit') setIsSelected(true);
			else if (mode === 'view') setIsSelected(false);
		},
		[ mode ]
	);

	return (
		<Grid className={classes.gridItem} onClick={handleCardClick} item xs>
			<Card className={`${classes.root} ${isSelected && classes.selected}`}>
				<CardMedia className={classes.poster} component="img" alt={title} image={imgSrc} title={title} />
				<CheckCircleRoundedIcon className={classes.selectedIcon} fontSize="large" />
				<CardContent className={classes.cardContent}>
					<Typography
						gutterBottom
						variant="h6"
						component="h2"
						className={`${classes.title} ${isSelected && classes.yellow}`}
					>
						{title}
						<IconButton className={classes.infoButton} size={'medium'} onClick={handleInfoClick}>
							<InfoIcon className={classes.icon} fontSize="large" />
						</IconButton>
					</Typography>
					{ratings && <MovieRatings ratings={ratings} id={id} />}
				</CardContent>
			</Card>
		</Grid>
	);
}

export default memo(MovieCard);
