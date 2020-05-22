import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	gridContainer: {
		maxWidth: '100%',
		margin: 0
	},
	gridItem: {
		display: 'flex',
		boxSizing: 'content-box',
		maxWidth: '300px'
	},
	gridSkeleton: {
		backgroundColor: 'rgba(0,0,0,0.25)'
	}
}));
