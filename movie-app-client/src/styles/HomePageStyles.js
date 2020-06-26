import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		// backgroundColor: theme.palette.background.primary,
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
			color: theme.palette.text.header,
			fontSize: '4rem',
			fontFamily: theme.fonts.header,
			fontWeight: 200,
			letterSpacing: '0.25rem',
			marginRight: '-0.25rem',
			'& span': {
				fontSize: '1.25em'
			}
		}
	},
	headerBtns: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginTop: '2rem'
	},
	headerBtn: {
		margin: '0.5rem !important',
		width: '180px',
		maxHeight: '40px',
		textDecoration: 'none',
		'& button': {
			width: '180px'
		}
	},
	movieLists: {
		padding: theme.spacing(2),
		width: '355px',
		maxWidth: '100%',
		margin: '0 auto !important',
		['@media (min-width: 387px)']: {
			maxWidth: '387px'
		},
		['@media (min-width: 742px)']: {
			maxWidth: '742px'
		},
		['@media (min-width: 1097px)']: {
			maxWidth: '1097px'
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
		width: '315px',
		paddingLeft: '20px !important',
		paddingRight: '20px !important',
		flexShrink: 1,

		padding: '0 !important'
		// marginBottom: '1rem'
	},
	title: {
		maxWidth: '100%'
	},
	divider: {
		'&.MuiDivider-root': {
			backgroundColor: theme.palette.text.secondary,
			opacity: 0.5
		}
	},
	[theme.breakpoints.down('md')]: {
		header: {
			height: 'auto',
			marginBottom: '1rem',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center'
		}
	},
	[theme.breakpoints.down('sm')]: {},
	[theme.breakpoints.down('xs')]: {
		header: {
			marginBottom: 0,
			'& h1': {
				fontSize: '3rem'
			}
		},
		headerBtns: {
			marginTop: '1rem'
		},
		divider: {
			maxWidth: '330px !important'
		}
	}
}));
