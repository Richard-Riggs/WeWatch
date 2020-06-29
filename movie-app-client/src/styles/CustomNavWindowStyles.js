import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
	appWindow: {
		position: 'absolute',
		top: 0,
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
		maxHeight: '100vh',
		width: '100%'
	},
	verticalScroll: {
		backgroundColor: theme.darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
		borderRadius: '3px'
	},
	bottomFill: {
		backgroundColor: 'yellow',
		width: '100%',
		height: '20vh',
		position: 'fixed',
		bottom: 0,
		zIndex: -11,
		background: theme.palette.background.gradient,
		backgroundSize: '100vw 120vh',
		backgroundPosition: '50% -80vh'
	}
}));
