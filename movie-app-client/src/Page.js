import React from 'react';
import useStyles from './styles/PageStyles.js';
export default ({ children, disableOffset }) => {
	const classes = useStyles();
	return (
		<div className={classes.Page}>
			{!disableOffset && <div id="back-to-top-anchor" className={classes.offset} />}
			{children}
		</div>
	);
};
