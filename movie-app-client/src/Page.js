import React from 'react';
import useStyles from './styles/PageStyles.js';
import Toolbar from '@material-ui/core/Toolbar';
export default ({ children, disableOffset }) => {
	const classes = useStyles();
	return (
		<div className={classes.Page}>
			<div className={classes.PageContent}>{children}</div>
		</div>
	);
};
