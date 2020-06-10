import React, { useState, useContext } from 'react';
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

export default function Navbar(props) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { isDarkMode, toggleTheme } = useContext(CustomThemeContext);
  const trigger = useScrollTrigger({
    disableHysteresis : true,
    threshold         : 0
  });

  return (
    <div className={classes.root}>
      <AppBar className={classes.AppBar} position="fixed" elevation={trigger ? 4 : 0}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link to="/" className={classes.title}>
            <h2>WeWatch</h2>
          </Link>
          {props.children}
          <Switch checked={isDarkMode} onChange={toggleTheme} />
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
}
