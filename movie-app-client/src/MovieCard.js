import React, { memo } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import MovieRatings from './MovieRatings';
import useStyles from './styles/MovieCardStyles';

function MovieCard(props) {
	const { title, poster_path, ratings, id, openInfo } = props;
	const theme = useTheme();
	const classes = useStyles(theme);
	const imgSrc = `https://image.tmdb.org/t/p/w300${poster_path}`;

	const handleClick = () => openInfo(id);

	return (
		<Grid className={classes.gridItem} item xs>
			<Card className={classes.root} onClick={handleClick}>
				<CardMedia className={classes.poster} component="img" alt={title} image={imgSrc} title={title} />
				<CardContent className={classes.cardContent}>
					<Typography gutterBottom variant="h6" component="h2" className={classes.title}>
						{title}
					</Typography>
					{ratings && <MovieRatings ratings={ratings} id={id} />}
				</CardContent>
			</Card>
		</Grid>
	);
}

export default memo(MovieCard);
