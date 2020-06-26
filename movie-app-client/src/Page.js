import React from 'react';
import useStyles from './styles/PageStyles.js';
export default ({ children }) => {
	const classes = useStyles();
	return <div className={classes.Page}>{children}</div>;
};
