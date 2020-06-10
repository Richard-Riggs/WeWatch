import React, { useState, useContext } from 'react';
import useToggleState from './hooks/useToggleState';
import { useTheme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { CustomThemeContext } from './contexts/CustomThemeContext';
import useStyles from './styles/NavbarStyles';
import SaveListDialog from './SaveListDialog';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ChevronLeftRoundedIcon from '@material-ui/icons/ChevronLeftRounded';

export default function Navbar(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { isDarkMode, toggleTheme } = useContext(CustomThemeContext);
  const [ openDrawer, toggleOpenDrawer ] = useToggleState(false);
  const trigger = useScrollTrigger({
    disableHysteresis : true,
    threshold         : 0
  });

  return (
    <div className={classes.root}>
      <Drawer className={classes.drawer} anchor={'left'} open={openDrawer} onClose={toggleOpenDrawer}>
        <Toolbar>
          <Link to="/" className={classes.title}>
            <h2>WeWatch</h2>
          </Link>
          <IconButton variant="contained" size="small" onClick={toggleOpenDrawer}>
            <ChevronLeftRoundedIcon fontSize="large" />
          </IconButton>
        </Toolbar>

        <List>
          <ListItem>
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
            <h2>WeWatch</h2>
          </Link>
          {props.children}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
}
