import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		marginBottom: '1rem',
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
		backgroundColor: '#413d43',
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
	overlay: {
		position: 'absolute',
		top: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0,0,0,0.65)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',

		'& h1': {
			margin: '0 0.5rem',
			padding: '0 0.5rem 0.25rem 0.5rem',
			fontSize: '1.25rem',
			backdropFilter: 'blur(2px)',
			borderRadius: '0.5rem',
			textAlign: 'center',
			lineHeight: '1.25rem'
		}
	},
	[theme.breakpoints.down('xs')]: {
		GridItem: {
			padding: '0 !important',
			marginBottom: '0.5rem'
		}
	}
}));
