import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { v4 as uuid } from 'uuid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const UserDataContext = createContext();
export function UserDataProvider({ children }) {
	const [ clientId, setClientId ] = useLocalStorageState('clientId', uuid());
	const [ notification, setNotification ] = useState({});
	const [ openSnackbar, setOpenSnackbar ] = useState(false);

	const handleSnackbarClose = () => {
		setOpenSnackbar(false);
	};

	// Resets notification after closing animation completes
	useEffect(
		() => {
			if (!openSnackbar)
				setTimeout(() => {
					setNotification({});
				}, 500);
		},
		[ openSnackbar ]
	);

	useEffect(
		() => {
			if (Object.keys(notification).length) setOpenSnackbar(true);
		},
		[ notification ]
	);

	return (
		<UserDataContext.Provider value={{ clientId, notifyUser: setNotification }}>
			<Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
				<Alert onClose={handleSnackbarClose} severity={notification.severity}>
					{notification.message}
				</Alert>
			</Snackbar>
			{children}
		</UserDataContext.Provider>
	);
}
