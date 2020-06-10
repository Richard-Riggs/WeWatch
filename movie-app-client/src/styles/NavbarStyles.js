import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root        : {},
  AppBar      : {
    backgroundColor : theme.palette.background.primary
  },
  menuButton  : {
    marginRight : theme.spacing(2)
  },
  title       : {
    marginRight    : 'auto',
    textDecoration : 'none',
    color          : 'purple'
  },
  navButton   : {
    marginLeft : theme.spacing(2)
  },
  offset      : theme.mixins.toolbar,
  listButtons : (props) => ({
    display : 'flex'
  }),
  '@global'   : {
    '.fade-enter'        : {
      opacity : 0
    },
    '.fade-enter-active' : {
      opacity    : 1,
      transition : 'opacity 0.2s ease-in-out'
    },
    '.fade-exit'         : {
      opacity : 1
    },
    '.fade-exit-active'  : {
      opacity    : 0,
      transition : 'opacity 0.2s ease-in-out'
    }
  }
}));
