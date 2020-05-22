import React, { memo } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import MovieRatings from './MovieRatings';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '300px',
		maxWidth: '300px',
		display: 'flex',
		flexDirection: 'column'
	},
	gridItem: {
		display: 'flex',
		boxSizing: 'content-box',
		maxWidth: '300px'
	},
	cardContent: {
		padding: '1rem !important',
		backgroundColor: theme.palette.background.secondary,
		color: theme.palette.text.primary
	}
}));

function MovieCard(props) {
	const { title, poster_path, backdrop_path, overview, ratings, id, openInfo } = props;
	const theme = useTheme();
	const classes = useStyles(theme);
	const imgSrc = `https://image.tmdb.org/t/p/w300${poster_path}`;

	const handleClick = () => openInfo(id);

	return (
		<Grid className={classes.gridItem} item xs>
			<Card className={classes.root} onClick={handleClick}>
				<CardMedia component="img" alt={title} image={imgSrc} title={title} />
				<CardContent
					className={classes.cardContent}
					style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
				>
					<Typography
						gutterBottom
						variant="h6"
						component="h2"
						style={{ marginBottom: 'auto', lineHeight: '1.5rem', paddingBottom: '1rem' }}
					>
						{title}
					</Typography>
					{ratings && <MovieRatings ratings={ratings} id={id} />}
				</CardContent>
			</Card>
		</Grid>
	);
}

export default memo(MovieCard);
