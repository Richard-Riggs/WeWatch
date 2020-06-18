import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
  rating                         : {
    display            : 'flex',
    alignItems         : 'center',
    '&:nth-of-type(2)' : {
      marginLeft : '1rem'
    }
  },
  ratings                        : (props) => ({
    display        : 'flex',
    justifyContent : props.justifyContent,
    alignItems     : 'center',
    fontWeight     : 'bold'
  }),
  icon                           : {
    width       : '35px',
    height      : '35px',
    marginRight : theme.spacing(0.75)
  },
  noRatings                      : {
    height     : '35px',
    display    : 'flex',
    alignItems : 'center',
    color      : theme.palette.text.secondary,
    fontWeight : 'normal'
  },
  [theme.breakpoints.down('sm')]: {
    ratings : {
      fontWeight : 'normal',
      fontSize   : '0.75rem'
    },
    rating  : {
      '&:nth-of-type(2)' : {
        marginLeft : '0.5rem'
      }
    },
    icon    : {
      width  : '25px',
      height : '25px'
    }
  }
}));
