import { makeStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginBottom: '2rem',
		'& .MuiExpansionPanel-root': {
			width: '90vw',
			'& .MuiExpansionPanelDetails-root': {
				flexDirection: 'column'
			}
		}
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
	fieldRow: {
		marginBottom: '2rem',
		display: 'flex',
		justifyContent: 'space-between',
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
			marginBottom: '0.5rem'
		},
		'& label': {
			paddingRight: theme.spacing(2)
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
			paddingLeft: theme.spacing(2)
		}
	}
}));
