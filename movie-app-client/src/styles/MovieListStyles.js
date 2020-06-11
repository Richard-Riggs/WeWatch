import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	gridContainer: {
		padding: '1rem',
		margin: '0 auto'
	},
	// '@media (min-width: 214px)' : {
	//   gridContainer : {
	//     maxWidth : '214px'
	//   }
	// },
	// '@media (min-width: 396px)' : {
	//   gridContainer : {
	//     maxWidth : '396px'
	//   }
	// },
	cardSpacer: {
		minWidth: '300px',
		maxWidth: '300px',
		margin: '1rem'
	},
	[theme.breakpoints.down('sm')]: {
		cardSpacer: {
			minWidth: '150px',
			maxWidth: '150px'
		}
	},
	[theme.breakpoints.down('xs')]: {
		cardSpacer: {
			margin: '0.5rem 0.2rem'
		},
		gridContainer: {
			padding: '0.2rem'
		}
	},

	gridItem: {
		display: 'flex',
		boxSizing: 'content-box',
		maxWidth: '300px',
		marginBottom: '2rem'
	},
	gridSkeleton: {
		backgroundColor: 'rgba(0,0,0,0.25)'
	}
}));
