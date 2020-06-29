import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
	appWindow: {
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
		maxHeight: '100vh',
		width: '100vw'
	},
	verticalScroll: {
		backgroundColor: theme.darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
		borderRadius: '3px'
	}
}));
