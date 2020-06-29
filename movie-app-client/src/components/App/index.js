import React from 'react';
import MovieApp from '../MovieApp';
import { UserDataProvider } from '../../contexts/UserDataContext';
import { CustomThemeProvider } from '../../contexts/CustomThemeContext';
import { MovieListsProvider } from '../../contexts/MovieListsContext';
import { VoteSessionProvider } from '../../contexts/VoteSessionContext';
import './styles.css';

export default function App() {
	return (
		<div className="App">
			<UserDataProvider>
				<MovieListsProvider>
					<VoteSessionProvider>
						<CustomThemeProvider>
							<MovieApp />
						</CustomThemeProvider>
					</VoteSessionProvider>
				</MovieListsProvider>
			</UserDataProvider>
		</div>
	);
}
