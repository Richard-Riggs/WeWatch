import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import MovieApp from './MovieApp';
import { lightTheme, darkTheme } from './styles/themes';
import { UserDataProvider } from './contexts/UserDataContext';
import { CustomThemeProvider } from './contexts/CustomThemeContext';
import { MovieListsProvider } from './contexts/MovieListsContext';
import './styles/App.css';

export default function App() {
	return (
		<div className="App">
			<UserDataProvider>
				<MovieListsProvider>
					<CustomThemeProvider>
						<MovieApp />
					</CustomThemeProvider>
				</MovieListsProvider>
			</UserDataProvider>
		</div>
	);
}
