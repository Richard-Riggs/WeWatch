import React from 'react';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import useStyles from './styles/ScrollToTopStyles';

export default function ScrollToTop(props) {
	const classes = useStyles();
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 100
	});
	const handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');
		if (anchor) {
			anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	};
	return (
		<Zoom in={trigger}>
			<div className={classes.root} onClick={handleClick} role="presentation">
				<Fab size="medium" color="default" aria-label="scroll back to top">
					<KeyboardArrowUpIcon />
				</Fab>
			</div>
		</Zoom>
	);
}
