import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: '1000px',
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		marginTop: '5vh',
		alignItems: 'center',
		'& header': {
			textAlign: 'center',
			margin: '3rem 2rem 2rem 2rem',
			'& h1': {
				fontSize: '3rem',
				textAlign: 'center',
				marginBottom: '0.2rem',
				[theme.breakpoints.down('xs')]: {
					fontSize: '1.5rem',
					marginBottom: '0.25rem'
				}
			},
			'& h2': {
				color: theme.palette.text.secondary,
				marginBottom: '1rem'
			}
		},

		[theme.breakpoints.down('sm')]: {
			marginTop: 0,
			'& header': {
				margin: '2rem 2rem 1rem 2rem',
				'& h1': {
					marginBottom: '0.5rem'
				}
			}
		},
		[theme.breakpoints.down('xs')]: {
			'& header': {
				margin: '0 1rem 0.5rem 1rem',
				'& h1': {
					fontSize: '1.5rem',
					marginBottom: '0.25rem'
				},
				'& h2': {
					fontSize: '1.15rem'
				}
			}
		}
	},
	lobbyInfo: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexWrap: 'wrap',
		marginBottom: '0.5rem',
		'& span': {
			margin: 'auto 1rem',
			fontSize: '1.35rem',
			[theme.breakpoints.down('xs')]: {
				fontSize: '1rem'
			}
		}
	},
	shareBtn: {
		borderRadius: '1rem',
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	instructions: {
		width: '100%',
		maxWidth: '600px',
		textAlign: 'left',
		margin: '1rem auto 2rem auto',
		display: 'flex',
		flexDirection: 'column',
		'& h3': {
			fontSize: '1.5rem',
			padding: '0.5rem 1rem'
		},
		'& p': {
			padding: '1rem',
			fontSize: '1.15rem'
		},
		[theme.breakpoints.down('xs')]: {
			margin: '0.5rem 0 1rem 0',
			'& h3': {
				fontSize: '1.2rem'
			},
			'& p': {
				paddingTop: 0,
				fontSize: '1rem'
			}
		}
	},
	leaderSection: {
		'& h2': {
			marginBottom: '1rem',
			textAlign: 'center',
			[theme.breakpoints.down('xs')]: {
				fontSize: '1.2rem'
			}
		}
	},
	leaderBtns: {
		'& button': {
			margin: 'auto 1rem',
			[theme.breakpoints.down('xs')]: {
				margin: 'auto 0.5rem'
			}
		}
	},
	startVoteBtn: {
		'&.Mui-disabled': {
			color: theme.palette.text.secondary,
			backgroundColor: `rgba(51, 51, 51, ${theme.darkMode ? '0.5' : '0.2'})`
		}
	},
	cancelBtn: {
		color: theme.palette.text.primary,
		borderColor: theme.palette.text.secondary
	}
}));
