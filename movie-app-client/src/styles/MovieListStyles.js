import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	gridContainer: {
		padding: '0 1rem',
		margin: '0 auto',
		maxWidth: '1700px'
	},
	cardSpacer: {
		minWidth: '300px',
		maxWidth: '300px',
		margin: '1rem'
	},
	gridItem: {
		display: 'flex !important',
		flexDirection: 'column',
		boxSizing: 'content-box',
		margin: '1rem'
	},
	gridSkeletonPoster: {
		backgroundColor: 'rgba(0,0,0,0.25)',
		width: '300px',
		height: '450px'
	},
	gridSkeletonText: {
		backgroundColor: 'rgba(0,0,0,0.25)',
		width: '300px',
		height: '100px',
		marginTop: '1rem',
		flexGrow: '1'
	},
	[theme.breakpoints.down('sm')]: {
		cardSpacer: {
			minWidth: '150px',
			maxWidth: '150px'
		},
		gridSkeletonPoster: {
			width: '150px',
			height: '225px'
		},
		gridSkeletonText: {
			width: '150px',
			height: '70px'
		}
	},
	[theme.breakpoints.down('xs')]: {
		cardSpacer: {
			margin: '0.5rem 0.2rem'
		},
		gridContainer: {
			padding: '0.2rem'
		},
		gridItem: {
			margin: '0.5rem 0.2rem'
		}
	}
}));
