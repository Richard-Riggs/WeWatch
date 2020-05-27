import { makeStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'center',
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
		'& h2': {
			margin: '0.5rem'
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
	}
}));
