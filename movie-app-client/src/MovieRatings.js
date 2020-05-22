import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './styles/MovieRatingsStyles';

MovieRatings.defaultProps = { justifyContent: 'space-between' };

export default function MovieRatings(props) {
	const { ratings, id } = props;
	const classes = useStyles(props);
	const theme = useTheme();
	return (
		<div className={classes.ratings}>
			{![ ...ratings ].length && <p className={classes.noRatings}>No ratings found</p>}
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
