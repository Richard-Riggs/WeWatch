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
import Navbar from './Navbar';
import StartVoteDialog from './StartVoteDialog';

export default function HomePage() {
	const theme = useTheme();
	const classes = useStyles(theme);
	const { movieLists } = useContext(MovieListsContext);
	const [ openVoteDialog, setOpenVoteDialog ] = useState(false);
	const handleVoteOpen = () => setOpenVoteDialog(true);
	return (
		<div className={classes.root}>
			<Navbar />
			<header className={classes.header}>
				<h1>WELCOME</h1>
				<div className={classes.headerBtns}>
					<Link to="/find">
						<Button variant="contained" color="primary">
							Find Movies
						</Button>
					</Link>
					<Button variant="contained" color="secondary" onClick={handleVoteOpen}>
						Start A Vote
					</Button>
				</div>
			</header>
			<Grid container className={classes.movieLists} spacing={3} justify="space-evenly">
				<Grid item xs={'auto'}>
					<Typography variant="h6" className={classes.title}>
						Your Movie Lists
					</Typography>
				</Grid>
				<Grid className={classes.spacer} item xs={'auto'} />
				<Grid className={classes.spacer} item xs={'auto'} />
				<Grid className={classes.divider} item xs={12}>
					<Divider />
				</Grid>

				{movieLists.map((list, i) => <MovieListItem movieList={list} />)}
				<Grid className={classes.spacer} item xs={'auto'} />
				<Grid className={classes.spacer} item xs={'auto'} />
			</Grid>
			<StartVoteDialog open={openVoteDialog} setOpen={setOpenVoteDialog} />
		</div>
	);
}
