import React from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '450px',
		width: '300px'
	},
	media: {
		height: '100%',
		backgroundSize: 'auto auto'
	}
}));

export default function MovieCard({ title, poster_path, backdrop_path }) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const imgSrc = `https://image.tmdb.org/t/p/w300${poster_path}`;
	return (
		<Card className={classes.root}>
			<CardMedia className={classes.media} image={imgSrc} title={title} />
		</Card>
	);
}
