import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		marginTop: '5vh',
		textAlign: 'center',
		[theme.breakpoints.down('xs')]: {
			marginTop: 0
		}
	},
	header: {
		display: 'inline',
		fontSize: '3rem',
		fontFamily: theme.fonts.header,
		fontWeight: 200,
		letterSpacing: '0.75rem',
		// Negative margin required to offset letter spacing on last letter
		marginRight: '-0.75rem',
		maxWidth: '100%',
		[theme.breakpoints.down('xs')]: {
			marginBottom: '1rem'
		}
	},
	subHeader: {
		marginTop: '1.5rem',
		padding: '0 0.5rem',
		fontWeight: 'normal',
		'& span': {
			fontWeight: 'bold'
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1rem'
		}
	},
	winners: {
		marginTop: '1.5rem',
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'nowrap'
	},
	winner: {
		margin: 'auto 1rem',
		maxWidth: '400px',
		'& img': {
			maxWidth: '100%',
			height: 'auto',
			boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
		},
		[theme.breakpoints.down('sm')]: {
			maxWidth: '300px'
		},
		[theme.breakpoints.down('xs')]: {
			maxWidth: '200px',
			margin: 'auto 0.5rem'
		}
	}
}));
