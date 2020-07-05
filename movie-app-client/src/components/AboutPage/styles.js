import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	'@global': {
		'@keyframes gradient': {
			[`0%`]: {
				backgroundPosition: '0%',
				boxShadow: '0px 4px 30px 0px rgba(74,0,184,1)'
			},
			[`25%`]: {
				backgroundPosition: '25%',
				boxShadow: '0px 4px 30px 0px rgba(98,2,162,1)'
			},
			[`50%`]: {
				backgroundPosition: '50%',
				boxShadow: '0px 4px 30px 0px rgba(136,1,169,1)'
			},
			[`75%`]: {
				backgroundPosition: '75%',
				boxShadow: '0px 4px 30px 0px rgba(150,2,155,1)'
			},
			[`100%`]: {
				backgroundPosition: '100%',
				boxShadow: '0px 4px 30px 0px rgba(167,4,139,1)'
			}
		}
	},
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
	header: {
		marginTop: '1rem',
		display: 'flex',
		position: 'relative',
		justifyContent: 'center',
		'& img': {
			width: '400px',
			height: '400px',
			zIndex: 2,
			[theme.breakpoints.down('xs')]: {
				width: '280px',
				height: '280px'
			}
		}
	},
	headerBackdrop: {
		zIndex: 0,
		display: 'flex',
		justifyContent: 'center',
		height: '400px',
		width: '100%',
		position: 'absolute'
	},
	screenBackground: {
		zIndex: 0,
		marginTop: '4px',
		width: '392px',
		height: '217px',
		borderRadius: '10px',
		background:
			'linear-gradient(270deg, rgba(167,4,139,1) 0%, rgba(150,2,155,1) 25%, rgba(136,1,169,1) 50%, rgba(98,2,162,1) 75%, rgba(74,0,184,1) 100%)',
		backgroundSize: '400% 400%',
		animation: 'gradient 10s linear infinite alternate',
		[theme.breakpoints.down('xs')]: {
			width: '274px',
			height: '152px'
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
