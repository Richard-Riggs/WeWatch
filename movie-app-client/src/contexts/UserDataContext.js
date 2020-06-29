import React, { createContext, useState, useEffect } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import { v4 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const UserDataContext = createContext();
export function UserDataProvider({ children }) {
	const [ clientId, setClientId ] = useLocalStorageState('clientId', uuid());
	const history = useHistory();
	const [ notification, setNotification ] = useState({});
	const [ openSnackbar, setOpenSnackbar ] = useState(false);

	const handleSnackbarClose = () => {
		setOpenSnackbar(false);
	};

	const initiateVote = async (movieList) => {
		const response = await axios.post('/api/vote', {
			movieList: movieList,
			clientId: clientId
		});
		history.push(`/vote/${response.data.sessionId}`);
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
		<UserDataContext.Provider value={{ clientId, notifyUser: setNotification, initiateVote }}>
			<Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
				<Alert onClose={handleSnackbarClose} severity={notification.severity}>
					{notification.message}
				</Alert>
			</Snackbar>
			{children}
		</UserDataContext.Provider>
	);
}
