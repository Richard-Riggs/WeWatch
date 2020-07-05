import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	listButtons: (props) => ({
		display: 'flex',
		'& h6': {
			fontSize: '1rem',
			display: 'flex',
			alignItems: 'center'
		}
	}),
	editBtn: {
		marginLeft: theme.spacing(2),
		color: theme.palette.text.primary,
		borderColor: theme.palette.text.secondary
	},
	numSelected: {
		color: theme.palette.text.primary
	},
	numSelectedInfo: {
		color: theme.palette.text.primary
	},
	saveBtn: {
		marginLeft: theme.spacing(2),
		backgroundColor: '#783ab6',
		color: '#e6e6e6',
		'&:hover': {
			backgroundColor: '#66319b'
		}
	},
	'@global': {
		'.fade-enter': {
			opacity: 0
		},
		'.fade-enter-active': {
			opacity: 1,
			transition: 'opacity 0.2s ease-in-out'
		},
		'.fade-exit': {
			opacity: 1
		},
		'.fade-exit-active': {
			opacity: 0,
			transition: 'opacity 0.2s ease-in-out'
		}
	},
	[theme.breakpoints.down('xs')]: {
		numSelected: {
			backgroundColor: '#4caf50',
			width: '36px',
			height: '36px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			borderRadius: '50%',
			color: 'white',
			lineHeight: '10px'
		},
		numSelectedInfo: {
			display: 'none'
		},
		editBtn: {
			marginLeft: theme.spacing(1)
		},
		saveBtn: {
			marginLeft: theme.spacing(1)
		}
	}
}));
