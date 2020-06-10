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
			margin: '3rem'
		}
	},
	lobbyInfo: {
		'& span': {
			margin: 'auto 1rem',
			fontSize: '1.35rem'
		}
	},
	instructions: {
		width: '60%',
		textAlign: 'left',
		margin: '2rem auto',
		'& h3': {
			fontSize: '1.5rem',
			marginBottom: '0.55rem'
		},
		'& p': {
			fontSize: '1.15rem'
		}
	},
	leaderSection: {
		'& h2': {
			marginBottom: '1rem',
			textAlign: 'center'
		}
	},
	leaderBtns: {
		'& button': {
			margin: 'auto 1rem'
		}
	}
}));
