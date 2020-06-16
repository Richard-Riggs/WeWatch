import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		maxWidth: '1200px',
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	header: {
		height: '20vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	headerText: {
		fontFamily: theme.fonts.header,
		fontWeight: 200,
		letterSpacing: '0.35rem',
		textAlign: 'center',
		fontSize: '3rem'
	},
	formPanel: {
		backgroundColor: theme.palette.background.secondary,
		color: theme.palette.text.primary,
		width: '95vw',
		'& .MuiExpansionPanelDetails-root': {
			flexDirection: 'row',
			flexWrap: 'wrap',
			padding: '0',
			justifyContent: 'space-evenly'
		}
	},
	fieldRow: {
		padding: '0 1rem 1.5rem 1rem',
		width: '300px',
		maxWidth: '500px',
		flexGrow: 1,
		display: 'flex',
		flexWrap: 'wrap',
		'& h2': {
			width: '100%',
			marginBottom: '0.5rem'
		}
	},
	searchRow: {
		flexGrow: 1,
		display: 'flex',
		'& .MuiFormControl-root': {
			flexGrow: 1
		}
	},
	searchInput: {
		'&.MuiFormControl-root': {
			flexGrow: 1,
			'& .MuiInputBase-root': {
				borderRadius: '2rem 0 0 2rem',
				'&.Mui-focused': {}
			}
		}
	},
	searchBtn: {
		borderRadius: '0 2rem 2rem 0'
	},
	discoverField: {
		flexGrow: 1,
		display: 'flex',
		'& label': {
			paddingRight: theme.spacing(1),
			display: 'flex',
			alignItems: 'center',
			paddingBottom: '0.3rem',
			fontWeight: 'bold'
		},
		'& button': {
			marginLeft: theme.spacing(2),
			borderRadius: '2rem'
		}
	},
	discoverSelect: {
		flexGrow: 1,
		marginRight: theme.spacing(3),
		'& .MuiSelect-root': {
			paddingLeft: theme.spacing(2),
			color: theme.palette.text.primary
		}
	},
	'@global': {
		'.MuiMenu-list': {
			color: theme.palette.text.primary,
			backgroundColor: theme.palette.background.secondary
		}
	},
	selectionCheckbox: {
		height: '42px',
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-end',
		'& .MuiFormControlLabel-root': {
			marginRight: '2.5vw'
		}
	},
	[theme.breakpoints.down('sm')]: {
		header: {
			height: 'auto',
			marginBottom: '1rem'
		},
		formPanel: {}
	},

	[theme.breakpoints.down('xs')]: {
		discoverField: {
			'& label': {
				paddingRight: theme.spacing(1)
			},
			'& button': {
				marginLeft: theme.spacing(1),
				maxWidth: '10px !important'
			}
		},
		discoverSelect: {
			marginRight: '0',
			flexShrink: 1,
			'& .MuiSelect-root': {
				paddingLeft: theme.spacing(1)
			}
		}
	}
}));
