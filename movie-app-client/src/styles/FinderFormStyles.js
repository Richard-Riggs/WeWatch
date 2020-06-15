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
			flexDirection: 'column'
		}
	},
	fieldRow: {
		marginBottom: '2rem',
		display: 'flex',
		justifyContent: 'space-around',
		flexWrap: 'wrap',
		'& h2': {
			margin: '0.5rem',
			paddingBottom: '0.5rem',
			width: '100%'
		}
	},
	searchRow: {
		width: '100%',
		display: 'flex'
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
		marginLeft: '2rem',
		marginTop: '1rem',
		display: 'flex',
		flexWrap: 'wrap',
		width: '400px',
		alignItems: 'center',
		'& h3': {
			width: '100%',
			marginBottom: '0.5rem',
			color: theme.palette.text.secondary
		},
		'& label': {
			paddingRight: theme.spacing(2)
		},
		'& button': {
			marginLeft: theme.spacing(2),
			borderRadius: '2rem'
		}
	},
	discoverInput: {
		display: 'flex',
		alignItems: 'center',
		width: '100%'
	},
	discoverSelect: {
		flexGrow: 1,
		flexShrink: 1,
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
		formPanel: {
			'& .MuiExpansionPanelDetails-root': {
				paddingTop: 0,
				paddingBottom: 0,
				paddingRight: '0.5rem',
				paddingLeft: '0.5rem'
			}
		},
		fieldRow: {
			marginBottom: '1rem',
			'& h2': {
				margin: '0 0.5rem'
			}
		},
		discoverField: {
			marginLeft: '0.5rem',
			'& label': {
				paddingRight: theme.spacing(1)
			},
			'& button': {
				marginLeft: theme.spacing(1),
				maxWidth: '10px !important'
			},
			'& h3': {
				marginBottom: 0
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
