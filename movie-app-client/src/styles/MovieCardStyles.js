import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
	root: {
		width: '300px',
		maxWidth: '300px',
		display: 'flex',
		flexDirection: 'column',
		position: 'relative',
		transition: 'all 0.2s ease-in-out',
		'&:hover&:not($selected)& $selectedIcon': {
			opacity: 0.5
		}
	},
	gridItem: {
		display: 'flex',
		boxSizing: 'content-box',
		maxWidth: '300px',
		marginBottom: '2rem'
	},
	poster: {
		width: '300px',
		height: '450px',
		objectFit: 'cover'
	},
	cardContent: {
		padding: '1rem !important',
		backgroundColor: theme.palette.background.secondary,
		color: theme.palette.text.primary,
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1
	},
	title: {
		marginBottom: 'auto',
		lineHeight: '1.5rem',
		paddingBottom: '1rem',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'space-between'
	},
	infoButton: {
		padding: 0
	},
	icon: {
		width: '30px',
		height: '30px'
	},
	selected: {
		transform: 'scale(1.05)',
		'& $selectedIcon': {
			opacity: 1
		}
	},
	selectedIcon: {
		position: 'absolute',
		top: 10,
		right: 10,
		color: '#4caf50',
		backgroundColor: 'white',
		borderRadius: '50%',
		opacity: 0,
		transition: 'all 0.2s ease-in-out'
	}
}));
