import React from 'react';
import useStyles from './styles';

export default function MovieListAvatar({ list, id }) {
	const classes = useStyles();
	const posters = list.slice(0, 7).map((movie) => `https://image.tmdb.org/t/p/w45${movie.poster_path}`);
	const getPosterImgs = (posters) => {
		const posterImgs = [];
		for (let i = 0; i < 7; i++) {
			// Iterates over array until posterImgs contains 7 elements
			const idx = i % posters.length;
			posterImgs.push(
				<div
					key={`miniposter-${id}-${i}`}
					className={classes.miniPoster}
					style={{
						backgroundImage: `url(${posters[idx]})`,
						backgroundSize: '45px 67.5px'
					}}
				/>
			);
		}
		return posterImgs;
	};
	return <div className={classes.root}>{getPosterImgs(posters)}</div>;
}
