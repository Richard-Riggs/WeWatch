import React, { useState } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import useStyles from './styles/FinderFormStyles';
import { useTheme } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import useToggleState from './hooks/useToggleState';
import Checkbox from '@material-ui/core/Checkbox';
import { GENRES } from './constants';

export default function FinderForm({ setQuery }) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [ genreVal, setGenreVal ] = useState('');
	const [ searchVal, setSearchVal ] = useState('');
	const [ trendingVal, setTrendingVal ] = useState('day');
	const [ formSummary, setFormSummary ] = useState(<p>Find movies to add to your list</p>);
	const [ expanded, toggleExpanded ] = useToggleState(true);
	const handleGenreChange = (e) => setGenreVal(e.target.value);
	const handleSearchChange = (e) => setSearchVal(e.target.value);
	const handleTrendingChange = (e) => setTrendingVal(e.target.value);

	const handleDiscover = () => {
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
				<h1 className={classes.headerText}>Find Movies</h1>
			</header>
			<ExpansionPanel expanded={expanded}>
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
								placeholder="Search"
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
							<h3>Popular</h3>
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
								onClick={handleDiscover}
								size="small"
								color="primary"
								variant="contained"
								disableElevation
							>
								Go
							</Button>
						</div>
						<div className={classes.discoverField}>
							<h3>Trending</h3>
							<label>Time Frame</label>
							<FormControl variant="outlined" className={classes.discoverSelect}>
								<Select
									input={<Input />}
									value={trendingVal}
									variant="outlined"
									onChange={handleTrendingChange}
									renderValue={(selected) => (selected === 'day' ? 'Past day' : 'Past week')}
								>
									<MenuItem value={'day'}>
										<ListItemText primary={'Past day'} />
									</MenuItem>
									<MenuItem value={'week'}>
										<ListItemText primary={'Past week'} />
									</MenuItem>
								</Select>
							</FormControl>
							<Button size="small" color="primary" variant="contained" disableElevation>
								Go
							</Button>
						</div>
					</div>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		</div>
	);
}
