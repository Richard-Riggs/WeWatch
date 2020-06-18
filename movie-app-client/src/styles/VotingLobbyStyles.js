import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		width: '100%',
		maxWidth: '1000px',
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		marginTop: '10vh',
		alignItems: 'center',
		'& h1': {
			fontSize: '3rem',
			margin: '3rem 2rem',
			textAlign: 'center',
			[theme.breakpoints.down('xs')]: {
				margin: '0 1rem 1rem 1rem',
				fontSize: '1.5rem'
			}
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: 0,
			'& h1': {
				margin: '2rem 2rem 1rem 2rem'
			}
		}
	},
	lobbyInfo: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexWrap: 'wrap',
		'& span': {
			margin: 'auto 1rem',
			fontSize: '1.35rem',
			[theme.breakpoints.down('xs')]: {
				fontSize: '1rem'
			}
		}
	},
	instructions: {
		width: '100%',
		maxWidth: '600px',
		textAlign: 'left',
		margin: '2rem auto',
		'& h3': {
			fontSize: '1.5rem',
			padding: '0.5rem 1rem'
		},
		'& p': {
			padding: '1rem',
			fontSize: '1.15rem'
		},
		[theme.breakpoints.down('xs')]: {
			margin: '0.5rem 0 0 0',
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
	}
}));
