import React from 'react';
import useStyles from './styles/PageStyles.js';
import Toolbar from '@material-ui/core/Toolbar';
export default ({ children }) => {
	const classes = useStyles();
	return (
		<div className={classes.Page} id="pagetest">
			<div id="pagecontenttest" className={classes.PageContent}>
				{children}
			</div>
		</div>
	);
};
