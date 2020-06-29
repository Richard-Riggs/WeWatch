import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
	root: {
		'& .MuiPaper-root': {
			backgroundColor: theme.palette.background.primary
		},
		'& .MuiListItemText-primary': {
			color: theme.palette.text.primary
		},
		'& .MuiListItemText-secondary': {
			color: theme.palette.text.secondary
		}
	},
	title: {
		color: theme.palette.text.primary,
		textAlign: 'center',
		paddingBottom: 0,
		'& h2': {
			fontSize: '1.5rem'
		}
	},
	noLists: {
		textAlign: 'center'
	}
}));
