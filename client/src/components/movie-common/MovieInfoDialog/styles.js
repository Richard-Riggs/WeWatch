import { makeStyles } from '@material-ui/core/styles';
import ImageNotFound from '../../../assets/images/image-not-found.svg';
import sizes from '../../../constants/sizes';
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
	infoPoster: (props) => ({
		display: 'none',
		flexGrow: 0,
		objectFit: 'cover',
		backgroundColor: theme.palette.background.primary,
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		[sizes.up('sm')]: (props) => ({
			display: 'block',
			minWidth: '300px',
			height: '450px',
			backgroundImage: `url(https://image.tmdb.org/t/p/w300${props.movieInfo
				.poster_path}), url(${ImageNotFound})`,
			backgroundSize: '300px 450px, 100px 100px'
		}),
		[sizes.up('lg')]: (props) => ({
			minWidth: '500px',
			height: '750px',
			backgroundImage: `url(https://image.tmdb.org/t/p/w500${props.movieInfo.poster_path}),
			url(${ImageNotFound})`,
			backgroundSize: '500px 750px, 100px 100px'
		})
	}),
	DialogContent: {
		backgroundColor: theme.palette.background.secondary,
		padding: 0,
		display: 'flex',
		flexDirection: 'column',
		height: '450px',
		maxHeight: '450px',
		width: '100%',
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
