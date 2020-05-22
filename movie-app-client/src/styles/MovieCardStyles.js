import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
	root: {
		width: '300px',
		maxWidth: '300px',
		display: 'flex',
		flexDirection: 'column',
		position: 'relative'
	},
	gridItem: {
		display: 'flex',
		boxSizing: 'content-box',
		maxWidth: '300px'
	},
	poster: {
		width: '300px',
		height: '450px',
		objectFit: 'cover'
	},
	cardContent: {
		padding: '1rem !important',
		backgroundColor: theme.palette.background.secondary,
		color: theme.palette.text.primary,
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1
	},
	title: {
		marginBottom: 'auto',
		lineHeight: '1.5rem',
		paddingBottom: '1rem',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'space-between'
	},
	infoButton: {
		padding: 0
	},
	icon: {
		width: '30px',
		height: '30px'
	}
}));
