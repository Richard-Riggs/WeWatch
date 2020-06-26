import { makeStyles } from '@material-ui/core/styles';
export default makeStyles((theme) => ({
	root: {
		'& header': {
			margin: '2rem auto',
			padding: '0 0.5rem',
			textAlign: 'center',
			'& h1': {
				marginBottom: '0.75rem',
				fontSize: '4rem',
				fontFamily: theme.fonts.header,
				color: theme.palette.text.header,
				[theme.breakpoints.down('sm')]: {
					fontSize: '3rem'
				}
			},
			'& p': {
				fontSize: '1.25rem'
			}
		}
	},
	[theme.breakpoints.down('xs')]: {
		root: {
			'& header': {
				margin: '0 0 0.5rem 0',

				'& p': {
					fontSize: '1rem'
				}
			}
		}
	}
}));
