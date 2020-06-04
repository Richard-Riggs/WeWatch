import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.primary,
		minHeight: '100%',
		'& header': {}
	},
	header: {
		width: '100%',
		height: '50vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		'& h1': {
			fontSize: '5rem',
			fontFamily: theme.fonts.header,
			fontWeight: 200,
			letterSpacing: '0.5rem'
		}
	},
	headerBtns: {
		marginTop: '2rem',
		'& a': {
			textDecoration: 'none'
		},
		'& button': {
			fontSize: '1rem',
			margin: '0 1rem'
		}
	},
	movieLists: {
		backgroundColor: theme.palette.background.secondary,
		padding: theme.spacing(2)
	},
	movieListItem: {
		margin: '1rem auto',
		display: 'flex',
		alignItems: 'flex-start'
	},
	movieListItemTitle: {
		flexGrow: 1
	}
}));
