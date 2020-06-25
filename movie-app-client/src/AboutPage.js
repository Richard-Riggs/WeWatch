import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Navbar from './Navbar';
import TMDbLogo from './assets/images/tmdbLogo.svg';
import useStyles from './styles/AboutPageStyles';
import { styled } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import {
	compose,
	borders,
	display,
	flexbox,
	palette,
	positions,
	shadows,
	sizing,
	spacing,
	typography
} from '@material-ui/system';
import {} from '@material-ui/system';

const Text = styled(Typography)(
	compose(borders, display, flexbox, palette, positions, shadows, sizing, spacing, typography)
);

export default function AboutPage() {
	const theme = useTheme();
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Navbar />
			<Box component="main" p={{ xs: 2, sm: 3 }} mt={4} maxWidth={800} mx="auto" mb="15vh">
				<Box mb={5}>
					<Text component="h2">
						Welcome to W<span>E</span>W<span>ATCH</span>
					</Text>
					<Text mt={3} textAlign="justify">
						WeWatch is an app for helping people find and select movies to watch. As the range of digital
						streaming options continues to expand, it can become difficult for groups of movie-watchers to
						be decisive. WeWatch helps groups of movie watchers overcome indecisiveness by streamlining the
						decision-making process.
					</Text>
				</Box>
				<Box mb={4}>
					<Text component="h2">
						How to Use W<span>E</span>W<span>ATCH</span>
					</Text>
					<Box className={classes.step}>
						<Text component="h3">1. Find Some Movies</Text>
						<Text>
							Use the discover feature (powered by <a href="https://www.themoviedb.org/">TMDb</a>) to find
							popular movies in your favorite genres. If you have specific movies in mind, simply search
							by movie title.
						</Text>
					</Box>
					<Box className={classes.step}>
						<Text component="h3">2. Make a Movie List</Text>
						<Text>
							Select the movies you're interested in watching and save them as a new movie list. Each
							movie list can hold up to 20 movies.
						</Text>
					</Box>
					<Box className={classes.step}>
						<Text component="h3">3. Create a Voting Session</Text>
						<Text>
							Once you've created a movie list, start a voting session. Invite friends to the voting
							session by sharing the lobby link.
						</Text>
					</Box>
					<Box className={classes.step}>
						<Text component="h3">4. Start the Vote</Text>
						<Text>
							When at least 2 people are in the lobby, click 'Start Vote' to begin the voting process.
							Select the movies in the movie list you are most interested in watching and click 'Submit'.
							The movie that receives the most votes wins!
						</Text>
					</Box>
				</Box>
				<Box>
					<Text component="h2">Sources</Text>
					<Text textAlign="center" mt={3}>
						WeWatch uses the following services for movie images and data:
					</Text>
					<Box className={classes.source}>
						<img src={TMDbLogo} alt="TMDb Logo" />
						<Box pt={1.5} pl={3}>
							<Text className={classes.sourceText}>
								The Movie Database (TMDb) is this app's primary movie data resource. TMDb's API powers
								WeWatch's search and discover features, and it provides poster images and general
								information for each result.
							</Text>
							<Text className={classes.notice} fontStyle="italic" mt={1}>
								Notice: This product uses the TMDb API but is not endorsed or certified by TMDb.
							</Text>
						</Box>
					</Box>
					<Box className={classes.source}>
						<Text component="h3" fontSize="2.65rem">
							OMDb
						</Text>
						<Text className={classes.sourceText} pt={1} pl={3}>
							WeWatch relies on The Open Movie Database (OMDb) for supplementary movie data. WeWatch uses
							OMDb's API to get additional information (e.g., runtime, ratings, and actors) for each
							result provided by TMDb.
						</Text>
					</Box>
				</Box>
			</Box>
		</div>
	);
}
