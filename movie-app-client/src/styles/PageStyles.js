import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
	Page: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%'
	},
	PageContent: {
		position: 'relative'
	},
	'@global': {
		'.page-enter': {
			transition: 'opacity 0.15s ease-in-out',
			transitionDelay: '0.15s',
			opacity: 0
		},
		'.page-enter-active': {
			opacity: 1
		},
		'.page-exit': {
			transition: 'opacity 0.15s ease-in-out',
			opacity: 1
		},
		'.page-exit-active': {
			opacity: 0
		}
	}
}));
