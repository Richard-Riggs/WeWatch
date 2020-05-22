import React from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '300px',
		maxWidth: '300px',
		display: 'flex',
		flexDirection: 'column'
		// display: 'flex',
		// flexDirection: 'column'
	},
	cardContent: {
		padding: '1rem !important',
		backgroundColor: theme.palette.background.secondary,
		color: theme.palette.text.primary
	},
	rating: {
		display: 'flex',
		alignItems: 'center'
	},
	ratings: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		fontWeight: 'bold'
	},
	icon: {
		width: '35px',
		height: '35px',
		marginRight: theme.spacing(0.75)
	}
}));

export default function MovieCard(props) {
	const { title, poster_path, backdrop_path, overview, ratings } = props;
	const theme = useTheme();
	const classes = useStyles(theme);
	const imgSrc = `https://image.tmdb.org/t/p/w300${poster_path}`;
	return (
		<Card className={classes.root}>
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
				<div className={classes.ratings}>
					{ratings &&
						ratings.map((r) => {
							switch (r['Source']) {
								case 'Internet Movie Database':
									return (
										<span className={classes.rating}>
											<img
												className={classes.icon}
												src="https://img.icons8.com/color/48/000000/imdb.png"
											/>{' '}
											{r['Value']}
										</span>
									);
								case 'Rotten Tomatoes':
									return (
										<span className={classes.rating}>
											<img
												className={classes.icon}
												src="https://img.icons8.com/color/48/000000/tomato.png"
											/>
											{r['Value']}
										</span>
									);
								default:
									return '';
							}
						})}
				</div>
			</CardContent>
		</Card>
	);
}
