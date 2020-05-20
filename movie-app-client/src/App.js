import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import MovieApp from './MovieApp';
import { lightTheme, darkTheme } from './styles/themes';
import './styles/App.css';

export default function App() {
	const darkMode = false;
	return (
		<div className="App">
			<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
				<MovieApp />
			</ThemeProvider>
		</div>
	);
}
