import { makeStyles } from '@material-ui/core/styles';
import sizes from './sizes';
export default makeStyles((theme) => ({
	infoDialog: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		maxHeight: '100%',
		[sizes.up('sm')]: {
			flexDirection: 'row',
			alignItems: 'flex-start'
		}
	},
	infoPoster: {
		display: 'none',
		flexGrow: 0,
		objectFit: 'cover',
		[sizes.up('sm')]: {
			width: '300px',
			height: '450px',
			display: 'block'
		},
		[sizes.up('lg')]: {
			width: '500px',
			height: '750px'
		}
	},
	DialogContent: {
		backgroundColor: theme.palette.background.secondary,
		padding: 0,
		display: 'flex',
		flexDirection: 'column',
		height: '450px',
		maxHeight: '450px',
		[sizes.up('lg')]: {
			height: '750px',
			maxHeight: '750px'
		}
	},
	DialogTitle: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		color: theme.palette.text.primary,
		[sizes.down('md')]: {
			'& h4': {
				fontSize: '1.5rem'
			}
		}
	},
	closeButton: {
		[sizes.down('md')]: {
			width: '24px',
			height: '24px',
			padding: 0,
			marginLeft: '0.75rem'
		}
	},
	DialogContentText: {
		padding: '0.5rem 1.5rem',
		color: 'black',
		overflow: 'auto',
		flexGrow: 1
	},
	infoRow: {
		display: 'flex',
		alignItems: 'flex-start !important',
		flexWrap: 'noWrap',
		minHeight: '32px',
		fontWeight: 'normal',
		paddingBottom: '1rem',
		color: theme.palette.text.secondary,
		flexDirection: 'column',
		[sizes.up('md')]: {
			flexDirection: 'row',
			paddingBottom: '0.5rem'
		}
	},
	infoRowHeader: {
		width: '120px',
		marginBottom: '0.15rem',
		flexShrink: 0,
		fontWeight: 'bold',
		color: theme.palette.text.primary,
		[sizes.up('md')]: {
			margin: 0
		}
	}
}));
