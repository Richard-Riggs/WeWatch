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
		height: '300px'
	}
}));

export default function MovieCard({ title }) {
	const theme = useTheme();
	const classes = useStyles(theme);
	return (
		<Card className={classes.root}>
			<span>{title}</span>
		</Card>
	);
}
