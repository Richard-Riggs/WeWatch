import React, { useState } from 'react';
import useStyles from './styles/MovieListAvatarStyles';

export default function MovieListAvatar({ list }) {
	const classes = useStyles();
	const posters = list.slice(0, 6).map((movie) => `https://image.tmdb.org/t/p/w45${movie.poster_path}`);
	return <div className={classes.root}>{posters.map((p) => <img className={classes.miniPoster} src={p} />)}</div>;
}
