import React from 'react';
import Grid from '@material-ui/core/Grid';
import MovieCard from './MovieCard';

export default function MovieList({ movies }) {
	return (
		<div>
			<Grid container spacing={3}>
				{movies.map((m) => (
					<Grid item xs={4}>
						<MovieCard {...m} key={m.id} />
					</Grid>
				))}
			</Grid>
		</div>
	);
}
