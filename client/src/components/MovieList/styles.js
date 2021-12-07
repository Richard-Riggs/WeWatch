import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	gridContainer: {
		padding: '0 1rem',
		margin: '0 auto',
		maxWidth: '1900px',
		justifyContent: 'center'
	},
	cardSpacer: {
		minWidth: '300px',
		maxWidth: '300px',
		margin: '2rem'
	},
	gridItem: {
		display: 'flex !important',
		flexDirection: 'column',
		boxSizing: 'content-box',
		margin: '2rem'
	},
	gridSkeletonPoster: {
		backgroundColor: theme.darkMode ? 'rgba(120,120,120,0.25)' : 'rgba(0,0,0,0.25)',
		width: '300px',
		height: '450px',
		borderRadius: '1rem'
	},
	gridSkeletonText: {
		backgroundColor: theme.darkMode ? 'rgba(120,120,120,0.25)' : 'rgba(0,0,0,0.25)',
		width: '300px',
		height: '100px',
		marginTop: '1rem',
		flexGrow: '1',
		borderRadius: '1rem'
	},
	[theme.breakpoints.down('sm')]: {
		cardSpacer: {
			minWidth: '150px',
			maxWidth: '150px',
			margin: '1rem'
		},
		gridItem: {
			margin: '1rem'
		},
		gridSkeletonPoster: {
			width: '150px',
			height: '225px',
			borderRadius: '0.75rem'
		},
		gridSkeletonText: {
			width: '150px',
			height: '40px',
			marginTop: '0.5rem',
			borderRadius: '0.75rem'
		}
	},
	[theme.breakpoints.down('xs')]: {
		cardSpacer: {
			margin: '0.5rem 0.2rem'
		},
		gridContainer: {
			padding: '0.2rem',
			justifyContent: 'space-evenly'
		},
		gridItem: {
			margin: '0.5rem 0.2rem'
		}
	}
}));
