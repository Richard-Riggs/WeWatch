import { createMuiTheme } from '@material-ui/core/styles';

export const lightTheme = createMuiTheme({
	darkMode: false,
	palette: {
		background: {
			primary: '#e6e6e6',
			secondary: '#f2f2f2',
			nav: '#ff531a'
		},
		text: {
			primary: '#1a1a1a',
			secondary: '#666666'
		}
	}
});

export const darkTheme = createMuiTheme({
	darkMode: true,
	palette: {
		background: {
			primary: '#262626',
			secondary: '#595959',
			nav: '#661a00'
		},
		text: {
			primary: '#a6a6a6',
			secondary: '#737373'
		}
	}
});
