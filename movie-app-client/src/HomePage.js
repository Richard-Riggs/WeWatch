import React, { useState, useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useStyles from './styles/HomePageStyles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MovieListItem from './MovieListItem';
import { MovieListsContext } from './contexts/MovieListsContext';

export default function HomePage() {
	const theme = useTheme();
	const classes = useStyles(theme);
	const { movieLists } = useContext(MovieListsContext);
	return (
		<div className={classes.root}>
			<header className={classes.header}>
				<h1>WELCOME</h1>
				<div className={classes.headerBtns}>
					<Link to="/new">
						<Button variant="contained" color="primary">
							Find Movies
						</Button>
					</Link>
					<Button variant="contained" color="secondary">
						Start A Vote
					</Button>
				</div>
			</header>
			<Grid container justify="center">
				<Grid className={classes.movieLists} item xs={10} xl={8}>
					<Typography variant="h6" className={classes.title}>
						Your Movie Lists
					</Typography>
					<Divider />
					<ul>
						{movieLists.map((list, i) => (
							<React.Fragment>
								{i > 0 && <Divider />}
								<MovieListItem movieList={list} />
							</React.Fragment>
						))}
					</ul>
				</Grid>
			</Grid>
		</div>
	);
}
