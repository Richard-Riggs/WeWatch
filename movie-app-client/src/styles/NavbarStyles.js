import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {},
	drawer: {
		'& .MuiDrawer-paper': {
			width: '300px',
			backgroundColor: theme.palette.background.primary,
			color: theme.palette.text.primary
		},
		'& a': {},
		'& .MuiToolbar-root': {
			display: 'flex',
			alignItems: 'center',
			'& button': {
				marginTop: '0.25rem',
				backgroundColor: theme.palette.background.secondary,
				opacity: 0.75,
				'&:hover': {
					opacity: 1
				}
			}
		},
		'& .MuiListItemIcon-root': {
			color: theme.palette.text.secondary
		}
	},
	AppBar: {
		color: theme.palette.text.primary,
		backgroundColor: 'transparent'
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		marginRight: 'auto',
		textDecoration: 'none',
		color: theme.palette.text.logo,
		fontFamily: theme.fonts.header,
		'& h2': {
			fontWeight: 400,
			fontSize: '2rem',
			textAlign: 'center'
		}
	},
	navButton: {
		marginLeft: theme.spacing(2)
	},
	offset: theme.mixins.toolbar,
	listButtons: (props) => ({
		display: 'flex',
		'& h6': {
			fontSize: '1rem',
			display: 'flex',
			alignItems: 'center'
		}
	}),
	editBtn: {
		marginLeft: theme.spacing(2)
	},
	'@global': {
		'.fade-enter': {
			opacity: 0
		},
		'.fade-enter-active': {
			opacity: 1,
			transition: 'opacity 0.2s ease-in-out'
		},
		'.fade-exit': {
			opacity: 1
		},
		'.fade-exit-active': {
			opacity: 0,
			transition: 'opacity 0.2s ease-in-out'
		}
	},
	[theme.breakpoints.down('xs')]: {
		AppBar: {
			'& $title': {
				display: 'none'
			},
			'& $menuButton': {
				marginRight: 'auto'
			}
		},
		numSelected: {
			backgroundColor: '#4caf50',
			width: '36px',
			height: '36px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: '50%',
			color: 'white',
			lineHeight: '10px'
		},
		numSelectedInfo: {
			display: 'none'
		},
		navButton: {
			marginLeft: theme.spacing(1)
		}
	}
}));
