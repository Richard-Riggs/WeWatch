import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		'& main': {
			'& h2': {
				fontFamily: theme.fonts.header,
				color: theme.palette.text.header,
				fontSize: theme.typography.h4.fontSize,
				textAlign: 'center',
				fontWeight: 300,
				letterSpacing: '0.025em',
				'& span': {
					fontSize: '0.8em'
				},
				[theme.breakpoints.up('sm')]: {
					fontSize: theme.typography.h3.fontSize
				},
				[theme.breakpoints.up('md')]: {
					fontSize: theme.typography.h2.fontSize
				}
			}
		},
		'& p': {
			fontSize: '1.35rem',
			[theme.breakpoints.down('xs')]: {
				fontSize: '1.2rem'
			}
		}
	},
	step: {
		marginTop: theme.spacing(3),
		'& h3': {
			fontSize: '1.75rem',
			marginBottom: theme.spacing(1),
			[theme.breakpoints.down('xs')]: {
				fontSize: '1.5rem'
			}
		},
		'& p': {
			marginLeft: theme.spacing(3),
			[theme.breakpoints.down('xs')]: {
				marginLeft: 0
			}
		}
	},
	source: {
		display: 'flex',
		alignItems: 'flex-start',
		marginTop: theme.spacing(3),
		'& img': {
			width: '125px',
			height: '125px'
		},
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
			'& img, & h3': {
				marginLeft: 'auto',
				marginRight: 'auto'
			}
		}
	},
	sourceText: {
		fontSize: '1.2rem !important'
	},
	notice: {
		fontSize: '1rem !important',
		fontStyle: 'italic'
	}
}));
