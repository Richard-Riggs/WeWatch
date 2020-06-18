import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		minHeight: '90vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	'@global': {
		'.Mui-disabled': {
			'&.MuiButton-contained': {
				color: theme.palette.text.secondary
			}
		}
	}
}));
