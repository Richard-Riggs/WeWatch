import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	AppBar: {
		backgroundColor: theme.palette.background.nav
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));
