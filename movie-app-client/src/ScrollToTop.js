import React, { useState, useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import useStyles from './styles/ScrollToTopStyles';
import _ from 'lodash';

export default function ScrollToTop({ trigger }) {
	const classes = useStyles();
	const handleClick = () => {
		const target = document.getElementById('scroller') || window;
		target.scrollTo({ top: 0, behavior: 'smooth' });
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
