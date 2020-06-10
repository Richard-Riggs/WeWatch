import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root        : {},
  drawer      : {
    '& .MuiDrawer-paper' : {
      width           : '300px',
      backgroundColor : theme.palette.background.primary,
      color           : theme.palette.text.primary
    },
    '& a'                : {},
    '& .MuiToolbar-root' : {
      display    : 'flex',
      alignItems : 'center',
      '& button' : {
        marginTop       : '0.25rem',
        backgroundColor : theme.palette.background.secondary,
        opacity         : 0.75,
        '&:hover'       : {
          opacity : 1
        }
      }
    }
  },
  AppBar      : {
    color           : theme.palette.text.primary,
    backgroundColor : theme.palette.background.primary
  },
  menuButton  : {
    marginRight : theme.spacing(2)
  },
  title       : {
    marginRight    : 'auto',
    textDecoration : 'none',
    color          : theme.palette.text.logo,
    fontFamily     : theme.fonts.header,
    '& h2'         : {
      fontWeight : 400,
      fontSize   : '2rem',
      textAlign  : 'center'
    }
  },
  navButton   : {
    marginLeft : theme.spacing(2)
  },
  offset      : theme.mixins.toolbar,
  listButtons : (props) => ({
    display : 'flex'
  }),
  editBtn     : {
    marginLeft : theme.spacing(2)
  },
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
