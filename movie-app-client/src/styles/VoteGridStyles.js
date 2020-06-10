import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
  root : {
    '& header' : {
      margin    : '2rem auto',
      textAlign : 'center',
      '& h1'    : {
        marginBottom : '0.75rem',
        fontSize     : '3rem'
      },
      '& p'     : {
        fontSize : '1.25rem'
      }
    }
  }
}));
