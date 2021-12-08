import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
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
		background: theme.palette.background.gradient,
		backgroundSize: '100vw 120vh'
	},
	menuButton: {
		marginRight: theme.spacing(2),
		color: theme.darkMode ? '#808080' : '#333333'
	},
	title: {
		marginRight: 'auto',
		textDecoration: 'none',
		color: theme.palette.text.logo,
		fontFamily: theme.fonts.header,
		'& h2': {
			fontWeight: 400,
			fontSize: '1.6rem',
			textAlign: 'center',
			'& span': {
				fontSize: '1.25em'
			}
		}
	},
	infoIcon: {
		transform: 'translate(16px, 0)',
		'& svg': {
			fontSize: '30px',
			color: theme.palette.text.primary,
			opacity: 0.7
		}
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
		}
	}
}));
