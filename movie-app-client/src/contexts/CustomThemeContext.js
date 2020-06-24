import React, { createContext } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { lightTheme, darkTheme } from '../styles/themes';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

export const CustomThemeContext = createContext();

export function CustomThemeProvider(props) {
	const [ isDarkMode, setDarkMode ] = useLocalStorageState('isDarkMode', true);
	const toggleTheme = () => setDarkMode(!isDarkMode);
	return (
		<CustomThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>{props.children}</ThemeProvider>
		</CustomThemeContext.Provider>
	);
}
