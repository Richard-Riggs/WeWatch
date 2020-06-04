import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		marginTop: '5vh',
		textAlign: 'center'
	},
	header: {
		marginBottom: '1.5rem',
		fontSize: '3rem',
		fontFamily: theme.fonts.header,
		fontWeight: 200,
		letterSpacing: '0.75rem',
		// Negative margin required to offset letter spacing on last letter
		marginRight: '-0.75rem'
	},
	subHeader: {
		marginTop: '1.5rem',
		fontWeight: 'normal',
		'& span': {
			fontWeight: 'bold'
		}
	},
	winners: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap'
	},
	winner: {
		margin: 'auto 1rem',
		maxWidth: '400px',
		'& img': {
			maxWidth: '100%',
			height: 'auto',
			boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
		}
	}
}));
