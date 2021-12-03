import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		display: 'flex',
		alignItems: 'flex-start',
		flexDirection: 'column',
		boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
		borderRadius: '0.5rem',
		overflow: 'hidden',
		'& header': {
			position: 'relative'
		}
	},
	content: {
		boxSizing: 'padding-box',
		backgroundColor: theme.palette.background.primary,
		display: 'flex',
		flexDirection: 'column',
		width: '315px'
	},
	contentHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '0.25rem 0.25rem 0 0.75rem'
	},
	actionBtns: {
		padding: '0.25rem 0 0.5rem 0',
		display: 'flex',
		justifyContent: 'center',
		'& button': {
			marginLeft: '0.5rem'
		},
		'& a': {
			textDecoration: 'none'
		}
	},
	viewBtn: {
		fontWeight: 'bold',
		color: theme.darkMode ? '#6664ce' : '#3c3ab7',
		borderColor: theme.darkMode ? '#6664ce' : '#3c3ab7',
		letterSpacing: '0.1rem'
	},
	voteBtn: {
		fontWeight: 'bold',
		color: theme.darkMode ? '#ff0040' : '#bb002f',
		borderColor: theme.darkMode ? '#ff0040' : '#bb002f',
		letterSpacing: '0.1rem'
	},
	overlay: {
		position: 'absolute',
		top: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,0)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, ${theme.darkMode ? '0.8' : '0.3'}) )`,

		'& h1': {
			margin: '0 0.5rem',
			padding: '0.2rem 0.5rem 0.25rem 0.5rem',
			fontSize: '1.25rem',
			backdropFilter: 'blur(1px)',
			borderRadius: '0.5rem',
			textAlign: 'center',
			lineHeight: '1.25rem',
			color: 'white',
			fontFamily: theme.fonts.header,
			// textShadow: '-1px 1px 0 #222, 1px 1px 0 #222, 1px -1px 0 #222, -1px -1px 0 #222',
			textShadow: `
			-2px -2px 10px rgba(0,0,0,0.6),
			-2px 2px 10px rgba(0,0,0,0.6),
			2px -2px 10px rgba(0,0,0,0.6),
			2px 2px 10px rgba(0,0,0,0.6),
			-4px -4px 20px rgba(0,0,0,1),
			-4px 4px 20px rgba(0,0,0,1),
			4px -4px 20px rgba(0,0,0,1),
			4px 4px 20px rgba(0,0,0,1)`,
			letterSpacing: '0.075rem'
		}
	},
	[theme.breakpoints.down('xs')]: {
		GridItem: {
			padding: '0 !important',
			marginBottom: '1.5rem'
		}
	}
}));
