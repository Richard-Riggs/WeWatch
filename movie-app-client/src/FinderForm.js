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

import Checkbox from '@material-ui/core/Checkbox';
import { GENRES } from './constants';

export default function FinderForm() {
	const theme = useTheme();
	const classes = useStyles(theme);
	const [ genreVals, setGenreVals ] = useState([]);
	const handleGenreChange = (e) => setGenreVals(e.target.value);
	return (
		<div className={classes.root}>
			<header className={classes.header}>
				<h1 className={classes.headerText}>Find Movies</h1>
			</header>
			<ExpansionPanel defaultExpanded>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<p>
						Showing search results for <strong>The Matrix</strong>
					</p>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<div className={classes.fieldRow}>
						<h2>Search</h2>
						<div className={classes.searchRow}>
							<TextField
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
							>
								Go
							</Button>
						</div>
					</div>
					<div className={classes.fieldRow}>
						<h2>Discover</h2>
						<h4>Popular</h4>

						<FormControl className={classes.formControl} variant={'outlined'}>
							<Select
								input={<Input />}
								multiple
								value={genreVals}
								onChange={handleGenreChange}
								displayEmpty={true}
								variant={'outlined'}
								renderValue={(selected) => {
									if (selected.length) return selected.map((s) => s.name).join(', ');
									else return 'All';
								}}
							>
								{GENRES.map((genre) => (
									<MenuItem key={genre.id} value={genre}>
										<Checkbox checked={genreVals.includes(genre)} />
										<ListItemText primary={genre.name} />
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
				</ExpansionPanelDetails>
				<Divider />
			</ExpansionPanel>
		</div>
	);
}
