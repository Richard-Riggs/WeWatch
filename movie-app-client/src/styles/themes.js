import { createMuiTheme } from '@material-ui/core/styles';

const shared = {
	fonts: {
		header: "'Oswald', sans-serif"
	}
};

export const lightTheme = createMuiTheme({
	...shared,
	darkMode: false,
	palette: {
		background: {
			primary: '#e6e6e6',
			secondary: '#f2f2f2',
			nav: '#600058'
		},
		text: {
			primary: '#1a1a1a',
			secondary: '#666666'
		}
	}
});

export const darkTheme = createMuiTheme({
	...shared,
	darkMode: true,
	palette: {
		background: {
			primary: '#262626',
			secondary: '#404040',
			nav: '#41003b'
		},
		text: {
			primary: '#e6e6e6',
			secondary: '#cccccc'
		}
	}
});
