import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	'@global': {
		'& .MuiTooltip-popper': {
			'& .MuiTooltip-tooltipPlacementTop': {
				margin: '0 !important'
			}
		}
	},
	root: {
		'& .MuiDialog-paper': {
			backgroundColor: theme.palette.background.primary,
			minWidth: '300px',
			[theme.breakpoints.down('xs')]: {
				margin: 0,
				padding: '0.5rem',
				'& .MuiDialogContent-root': {
					padding: '0.5rem'
				}
			}
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
	saveBtn: {
		marginLeft: theme.spacing(2),
		backgroundColor: '#783ab6',
		color: '#e6e6e6',
		'&:hover': {
			backgroundColor: '#66319b'
		}
	},
	optionText: {
		'& .MuiListItemText-primary': {
			fontSize: '1.15rem'
		}
	}
}));
