import React, { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import useStyles from './styles/ScrollToTopStyles';
import _ from 'lodash';

export default function ScrollToTop(props) {
	const classes = useStyles();
	const [ trigger, setTrigger ] = useState(false);

	const updateTrigger = (e) => {
		if (e.target.scrollTop > 200) {
			setTrigger(true);
		} else {
			setTrigger(false);
		}
	};
	const handleClick = () => {
		const scroller = document.getElementById('scroller');
		if (scroller) {
			scroller.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	useEffect(() => {
		const customScroller = document.getElementById('scroller').firstChild;
		customScroller.addEventListener('scroll', _.throttle(updateTrigger, 300));
	}, []);

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
