import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {},
	AppBar: {
		backgroundColor: theme.palette.background.nav
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		marginRight: 'auto',
		textDecoration: 'none',
		color: 'white'
	},
	navButton: {
		marginLeft: theme.spacing(2)
	},
	offset: theme.mixins.toolbar,
	listButtons: (props) => ({
		display: 'flex',
		transition: 'all 0.2s ease-in-out'
	})
}));
