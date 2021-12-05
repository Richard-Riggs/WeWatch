import React, { useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import useStyles from './styles';
import { useTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import useToggleState from '../../hooks/useToggleState';
import Checkbox from '@material-ui/core/Checkbox';
import GENRES from '../../constants/genres';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CSSTransition } from 'react-transition-group';

export default function FinderForm({ setQuery, showSelected, toggleShowSelected, selectedMovies }) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [ genreVal, setGenreVal ] = useState('');
	const [ searchVal, setSearchVal ] = useState('');
	const [ formSummary, setFormSummary ] = useState(<p>Find movies to add to your list</p>);
	const [ expanded, toggleExpanded ] = useToggleState(true);
	const handleGenreChange = (e) => setGenreVal(e.target.value);
	const handleSearchChange = (e) => setSearchVal(e.target.value);

	const handleDiscoverPopular = () => {
		toggleExpanded();
		const genreName = genreVal ? GENRES.find((g) => g.id === genreVal).name.toLowerCase() : '';
		setFormSummary(
			<p>
				Showing popular <strong>{genreName}</strong> movies{' '}
				{!genreVal && (
					<span>
						of <strong>all genres</strong>
					</span>
				)}
			</p>
		);
		setQuery({
			type: 'discover',
			value: genreVal || '',
			params: {
				language: 'en-US',
				sort_by: 'popularity.desc',
				include_adult: false,
				include_video: false,
				with_genres: genreVal || ''
			}
		});
	};

	const handleSearch = () => {
		if (searchVal) {
			toggleExpanded();

			setFormSummary(
				<p>
					Showing search results for <strong>{searchVal}</strong>
				</p>
			);

			setQuery({
				type: 'search',
				value: searchVal,
				params: {
					language: 'en-US',
					query: searchVal,
					include_adult: false
				}
			});
		}
	};

	return (
		<div className={classes.root}>
			<header className={classes.header}>
				<h1 className={classes.headerText}>FIND MOVIES</h1>
			</header>
			<div className={classes.panelContainer}>
				<ExpansionPanel className={classes.formPanel} expanded={expanded}>
					<ExpansionPanelSummary onClick={toggleExpanded} expandIcon={<ExpandMoreIcon />}>
						{formSummary}
					</ExpansionPanelSummary>
					<ExpansionPanelDetails>
						<div className={classes.fieldRow}>
							<h2>Search</h2>
							<div className={classes.searchRow}>
								<TextField
									value={searchVal}
									onChange={handleSearchChange}
									className={classes.searchInput}
									type="search"
									variant="outlined"
									placeholder="Search for a movie"
									size="small"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<SearchIcon />
											</InputAdornment>
										)
									}}
								/>
								<Button
									className={classes.searchBtn}
									size="small"
									color="primary"
									variant="contained"
									disableElevation
									onClick={handleSearch}
								>
									Go
								</Button>
							</div>
						</div>
						<div className={classes.fieldRow}>
							<h2>Discover</h2>
							<div className={classes.discoverField}>
								<label>Genre</label>
								<FormControl className={classes.discoverSelect} variant="outlined">
									<Select
										input={<Input />}
										value={genreVal}
										onChange={handleGenreChange}
										displayEmpty={true}
										variant="outlined"
										renderValue={(selected) =>
											selected ? GENRES.find((g) => g.id === selected).name : 'Any'}
									>
										<MenuItem value={''}>
											<ListItemText primary={'Any (Default)'} />
										</MenuItem>
										<Divider />
										{GENRES.map((genre) => (
											<MenuItem key={genre.id} value={genre.id}>
												<ListItemText primary={genre.name} />
											</MenuItem>
										))}
									</Select>
								</FormControl>
								<Button
									onClick={handleDiscoverPopular}
									size="small"
									color="primary"
									variant="contained"
									disableElevation
								>
									Go
								</Button>
							</div>
						</div>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>

			<div className={classes.selectionCheckbox}>
				<CSSTransition
					classNames="fade"
					in={selectedMovies.length > 0}
					timeout={200}
					mountOnEnter
					unmountOnExit
				>
					<FormControlLabel
						control={<Checkbox color="primary" checked={showSelected} onChange={toggleShowSelected} />}
						label="Only View Selection"
					/>
				</CSSTransition>
			</div>
		</div>
	);
}
