import React, { useState } from 'react';
import useStyles from './styles/MovieListAvatarStyles';

export default function MovieListAvatar({ list }) {
	const classes = useStyles();
	const posters = list.slice(0, 7).map((movie) => `https://image.tmdb.org/t/p/w45${movie.poster_path}`);
	const getPosterImgs = (posters) => {
		const posterImgs = [];
		for (let i = 0; i < 7; i++) {
			// Loops over array until posterImgs contains 7 elements

			const idx = Math.ceil((i / posters.length - Math.floor(i / posters.length)) * posters.length);
			posterImgs.push(<img className={classes.miniPoster} src={posters[idx]} />);
		}
		return posterImgs;
	};
	return <div className={classes.root}>{getPosterImgs(posters)}</div>;
}
