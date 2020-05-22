import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
	rating: {
		display: 'flex',
		alignItems: 'center'
	},
	ratings: (props) => ({
		display: 'flex',
		justifyContent: props.justifyContent,
		alignItems: 'center',
		fontWeight: 'bold'
	}),
	icon: {
		width: '35px',
		height: '35px',
		marginRight: theme.spacing(0.75)
	},
	noRatings: {
		height: '35px',
		display: 'flex',
		alignItems: 'center',
		color: theme.palette.text.secondary,
		fontWeight: 'normal'
	}
}));
