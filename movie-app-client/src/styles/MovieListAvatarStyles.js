import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		width: '135px',
		maxHeight: '135px',
		borderRadius: '0.5rem',
		overflow: 'hidden',
		backgroundColor: theme.palette.background.primary,
		boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
		marginRight: theme.spacing(4)
	},
	miniPoster: {
		width: '45px',
		height: '67.5px'
	}
}));
