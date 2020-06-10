import React, { useState, useContext } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import { CustomThemeContext } from './contexts/CustomThemeContext';
import { MovieListsContext } from './contexts/MovieListsContext';
import useStyles from './styles/NavbarStyles';
import { withRouter } from 'react-router';
import SaveListDialog from './SaveListDialog';
import { CSSTransition } from 'react-transition-group';

export default function MovieFinderNav({ selectedMovies }) {
  const numSelected = selectedMovies.length;
  const theme = useTheme();
  const classes = useStyles(theme);
  const { isDarkMode, toggleTheme } = useContext(CustomThemeContext);
  const [ openSave, setOpenSave ] = useState(false);
  const handleOpenSave = () => setOpenSave(true);

  return (
    <React.Fragment>
      <CSSTransition classNames="fade" in={numSelected > 0} timeout={200} appear mountOnEnter unmountOnExit>
        <div className={classes.listButtons}>
          <Typography variant="h6">
            {numSelected || 'No'} Movie{numSelected === 1 ? '' : 's'} Selected
          </Typography>
          <Button
            className={classes.navButton}
            variant="contained"
            color="secondary"
            onClick={handleOpenSave}
            startIcon={<SaveIcon />}
          >
            Save New List
          </Button>
          <Button className={classes.navButton} variant="contained" color="primary" startIcon={<AddIcon />}>
            Add to List
          </Button>
        </div>
      </CSSTransition>
      <SaveListDialog open={openSave} setOpen={setOpenSave} />
    </React.Fragment>
  );
}
