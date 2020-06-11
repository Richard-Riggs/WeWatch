import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.primary,
		minHeight: '100%'
	},
	header: {
		width: '100%',
		height: '50vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		'& h1': {
			fontSize: '5rem',
			fontFamily: theme.fonts.header,
			fontWeight: 200,
			letterSpacing: '0.5rem'
		}
	},
	headerBtns: {
		marginTop: '2rem',
		'& a': {
			textDecoration: 'none'
		},
		'& button': {
			fontSize: '1rem',
			margin: '0 1rem'
		}
	},
	movieLists: {
		padding: theme.spacing(2),
		maxWidth: '800px',
		margin: '0 auto !important',
		maxWidth: '100%'
	},
	movieListItem: {
		margin: '1rem auto',
		display: 'flex',
		alignItems: 'flex-start',
		maxWidth: '100%'
	},
	spacer: {
		boxSizing: 'content-box !important',
		width: '225px',
		marginBottom: '1rem'
	},
	movieListItemTitle: {
		flexGrow: 1
	},
	[theme.breakpoints.down('md')]: {
		header: {
			height: 'auto',
			marginBottom: '2rem',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			'& h1': {
				fontSize: '4rem',
				fontFamily: theme.fonts.header,
				fontWeight: 200,
				letterSpacing: '0.5rem'
			}
		}
	}
}));
