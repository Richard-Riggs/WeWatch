import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
	root: {
		background: theme.palette.background.gradient,
		backgroundSize: '100vw 100vh',
		backgroundRepeat: 'no-repeat',
		backgroundAttachment: 'fixed',
		color: theme.palette.text.primary,
		width: '100%',
		minHeight: '90vh',
		paddingBottom: '10vh'
	}
}));
