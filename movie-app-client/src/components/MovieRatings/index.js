import React from 'react';
import useStyles from './styles';

MovieRatings.defaultProps = { justifyContent: 'space-between' };

export default function MovieRatings(props) {
	const { ratings, id } = props;
	const classes = useStyles(props);
	return (
		<div className={classes.ratings}>
			{(!ratings || ![ ...ratings ].length) && <p className={classes.noRatings}>No ratings found</p>}
			{ratings &&
				ratings.map((r) => {
					switch (r['Source']) {
						case 'Internet Movie Database':
							return (
								<span className={classes.rating} key={`${id}_imdb`}>
									<img
										className={classes.icon}
										src="https://img.icons8.com/color/48/000000/imdb.png"
									/>
									{r['Value']}
								</span>
							);
						case 'Rotten Tomatoes':
							return (
								<span className={classes.rating} key={`${id}_rt`}>
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
	);
}
