import React, { useContext, useState, useEffect } from 'react';
import useToggleState from '../../hooks/useToggleState';
import { useTheme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { CustomThemeContext } from '../../contexts/CustomThemeContext';
import useStyles from './styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';
import ScrollToTop from '../ScrollToTop';
import StartVoteDialog from '../StartVoteDialog';
import { Route, Switch as NavSwitch } from 'react-router';
import HelpRoundedIcon from '@material-ui/icons/HelpRounded';
import MovieFinderNav from '../MovieFinderNav';
import MovieVoterNav from '../MovieVoterNav';
import MovieViewerNav from '../MovieViewerNav';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

export default function Navbar() {
	const theme = useTheme();
	const classes = useStyles(theme);
	const { isDarkMode, toggleTheme } = useContext(CustomThemeContext);
	const [ openDrawer, toggleOpenDrawer ] = useToggleState(false);
	const [ openVoteDialog, setOpenVoteDialog ] = useState(false);
	const [ target, setTarget ] = useState();
	const handleVoteOpen = () => {
		toggleOpenDrawer();
		setOpenVoteDialog(true);
	};

	const trigger = useScrollTrigger({
		threshold: 0,
		target: target,
		disableHysteresis: true
	});

	useEffect(() => {
		setTarget(document.getElementById('scroller') || window);
	}, []);

	return (
		<div className={classes.root}>
			<Drawer className={classes.drawer} anchor={'left'} open={openDrawer} onClose={toggleOpenDrawer}>
				<Toolbar>
					<Link to="/" className={classes.title}>
						<h2>
							<span>W</span>E<span>W</span>ATCH
						</h2>
					</Link>
					<IconButton variant="contained" size="small" onClick={toggleOpenDrawer}>
						<ChevronLeftRoundedIcon fontSize="large" />
					</IconButton>
				</Toolbar>

				<List>
					<ListItem button component={Link} to="/" onClick={toggleOpenDrawer}>
						<ListItemIcon>
							<HomeRoundedIcon />
						</ListItemIcon>
						<ListItemText primary="Home" />
					</ListItem>
					<ListItem button component={Link} to="/find" onClick={toggleOpenDrawer}>
						<ListItemIcon>
							<SearchRoundedIcon />
						</ListItemIcon>
						<ListItemText primary="Find Movies" />
					</ListItem>
					<ListItem button onClick={handleVoteOpen}>
						<ListItemIcon>
							<CheckRoundedIcon />
						</ListItemIcon>
						<ListItemText primary="Start a Vote" />
					</ListItem>
					<ListItem button component={Link} to="/about" onClick={toggleOpenDrawer}>
						<ListItemIcon>
							<InfoRoundedIcon />
						</ListItemIcon>
						<ListItemText primary="About WeWatch" />
					</ListItem>

					<Divider />
					<ListItem>
						<ListItemIcon>
							<Brightness4Icon />
						</ListItemIcon>
						<ListItemText primary="Toggle Dark Theme" />
						<ListItemSecondaryAction>
							<Switch checked={isDarkMode} onChange={toggleTheme} />
						</ListItemSecondaryAction>
					</ListItem>
				</List>
			</Drawer>
			<AppBar className={classes.AppBar} position="fixed" elevation={trigger ? 4 : 0}>
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={toggleOpenDrawer}
						onClose={toggleOpenDrawer}
					>
						<MenuIcon />
					</IconButton>
					<Link to="/" className={classes.title}>
						<h2>
							<span>W</span>E<span>W</span>ATCH
						</h2>
					</Link>

					<NavSwitch>
						<Route
							exact
							path="/"
							render={() => (
								<IconButton className={classes.infoIcon} component={Link} to="/about">
									<HelpRoundedIcon />
								</IconButton>
							)}
						/>
						<Route exact path="/find" render={() => <MovieFinderNav />} />
						<Route exact path="/vote/:sessionId" render={() => <MovieVoterNav />} />
						<Route exact path="/movie-lists/:listId" render={() => <MovieViewerNav />} />
					</NavSwitch>
				</Toolbar>
			</AppBar>
			<ScrollToTop trigger={trigger} />
			<StartVoteDialog open={openVoteDialog} setOpen={setOpenVoteDialog} />
		</div>
	);
}
