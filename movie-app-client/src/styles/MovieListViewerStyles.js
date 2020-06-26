import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
	root: {
		'& h1': {
			margin: '1.5rem',
			fontSize: '4rem',
			letterSpacing: '0.1rem',
			textAlign: 'center',
			fontFamily: theme.fonts.header,
			color: theme.palette.text.header
		}
	},
	[theme.breakpoints.down('xs')]: {
		root: {
			'& h1': {
				margin: '1rem',
				fontSize: '2rem'
			}
		}
	}
}));
