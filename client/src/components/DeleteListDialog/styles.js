import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		'& .MuiPaper-root': {
			backgroundColor: theme.palette.background.primary,
			color: theme.palette.text.primary,
			'& .MuiDialogContentText-root': {
				color: theme.palette.text.secondary
			}
		}
	}
}));
