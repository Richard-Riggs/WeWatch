import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
	root: {
		color: theme.palette.text.primary,
		'&:before': {
			// This is the best mobile-friendly solution for static backgrounds
			// Background-attach is poorly supported on mobile browsers
			content: '""',
			display: 'block',
			position: 'fixed',
			left: 0,
			top: 0,
			width: '100%',
			height: '120vh',
			zIndex: -10,
			background: theme.palette.background.gradient
		}
	},
	appWindow: {
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
		width: '100vw'
	},
	verticalScroll: {
		backgroundColor: theme.darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
		borderRadius: '3px'
	}
}));
