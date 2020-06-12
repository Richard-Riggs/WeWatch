import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		alignContent: 'flex-start',
		width: '315px',
		maxHeight: '135px',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.primary
	},
	miniPoster: {
		width: '45px',
		height: '67.5px'
	}
}));
