import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.primary,
		minHeight: '100%'
	},
	header: {
		width: '100%',
		height: '40vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		'& h1': {
			fontSize: '5rem',
			fontFamily: theme.fonts.header,
			fontWeight: 200,
			letterSpacing: '0.5rem',
			marginRight: '-0.5rem'
		}
	},
	headerBtns: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginTop: '2rem',
		'& a': {
			textDecoration: 'none',
			margin: '0 0.5rem'
		},
		'& button': {
			fontSize: '1rem',
			margin: '0 0.5rem'
		}
	},
	movieLists: {
		padding: theme.spacing(2),
		maxWidth: '100%',
		margin: '0 auto !important'
	},
	[theme.breakpoints.up('lg')]: {
		movieLists: {
			maxWidth: '1100px'
		}
	},
	movieListItem: {
		margin: '1rem auto',
		display: 'flex',
		alignItems: 'flex-start',
		maxWidth: '100%'
	},
	spacer: {
		boxSizing: 'content-box !important',
		width: '339px',
		flexShrink: 1,

		padding: '0 !important'
		// marginBottom: '1rem'
	},
	title: {
		width: '315px'
	},
	divider: {
		paddingTop: '0 !important',
		paddingBottom: '1rem !important'
	},
	[theme.breakpoints.down('md')]: {
		header: {
			height: 'auto',
			marginBottom: '1rem',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			'& a, & button': {
				margin: '0 0.25rem'
			},
			'& h1': {
				fontSize: '4rem',
				fontFamily: theme.fonts.header,
				fontWeight: 200,
				letterSpacing: '0.5rem'
			}
		}
	},
	[theme.breakpoints.down('sm')]: {},
	[theme.breakpoints.down('xs')]: {
		title: {
			width: 'auto',

			width: '275px'
		},
		divider: {
			maxWidth: '330px !important'
		}
	}
}));
