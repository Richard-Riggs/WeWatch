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
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';

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
				<h1>
					<span>W</span>E<span>W</span>ATCH
				</h1>
				<div className={classes.headerBtns}>
					<Link className={classes.headerBtn} to="/find">
						<Button variant="contained" color="primary" startIcon={<SearchRoundedIcon />}>
							Find Movies
						</Button>
					</Link>
					<Button
						className={classes.headerBtn}
						variant="contained"
						color="secondary"
						onClick={handleVoteOpen}
						startIcon={<CheckRoundedIcon />}
					>
						Start A Vote
					</Button>
				</div>
			</header>
			<Grid container className={classes.movieLists} spacing={5} justify="center">
				<Grid item xs={12}>
					<Typography variant="h6" className={classes.title}>
						Your Movie Lists
					</Typography>
					<Divider className={classes.divider} />
				</Grid>
				{movieLists.map((list, i) => <MovieListItem movieList={list} />)}
				<Grid className={classes.spacer} item xs={'auto'} />
				<Grid className={classes.spacer} item xs={'auto'} />
			</Grid>
			<StartVoteDialog open={openVoteDialog} setOpen={setOpenVoteDialog} />
		</div>
	);
}
