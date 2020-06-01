import React, { createContext } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { lightTheme, darkTheme } from '../styles/themes';
import useToggleState from '../hooks/useToggleState';

export const CustomThemeContext = createContext();

export function CustomThemeProvider(props) {
	const [ isDarkMode, toggleTheme ] = useToggleState(false);
	return (
		<CustomThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>{props.children}</ThemeProvider>
		</CustomThemeContext.Provider>
	);
}
