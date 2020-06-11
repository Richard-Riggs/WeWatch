import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
	root: {
		'& h1': {
			margin: '1.5rem',
			fontSize: '2.5rem',
			textAlign: 'center'
		}
	},
	[theme.breakpoints.down('xs')]: {
		root: {
			'& h1': {
				margin: '1rem',
				fontSize: '1.75rem'
			}
		}
	}
}));
