import React from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	rating: {
		display: 'flex',
		alignItems: 'center'
	},
	ratings: (props) => ({
		display: 'flex',
		justifyContent: props.justifyContent,
		alignItems: 'center',
		fontWeight: 'bold'
	}),
	icon: {
		width: '35px',
		height: '35px',
		marginRight: theme.spacing(0.75)
	}
}));

MovieRatings.defaultProps = { justifyContent: 'space-between' };

export default function MovieRatings(props) {
	const { ratings, id } = props;
	const classes = useStyles(props);
	const theme = useTheme();
	return (
		<div className={classes.ratings}>
			{ratings.map((r) => {
				switch (r['Source']) {
					case 'Internet Movie Database':
						return (
							<span className={classes.rating} key={`${id}_imdb`}>
								<img className={classes.icon} src="https://img.icons8.com/color/48/000000/imdb.png" />
								{r['Value']}
							</span>
						);
					case 'Rotten Tomatoes':
						return (
							<span className={classes.rating} key={`${id}_rt`} style={{ marginLeft: '1rem' }}>
								<img className={classes.icon} src="https://img.icons8.com/color/48/000000/tomato.png" />
								{r['Value']}
							</span>
						);
					default:
						return '';
				}
			})}
		</div>
	);
}
