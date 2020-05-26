import { createMuiTheme } from '@material-ui/core/styles';

export const lightTheme = createMuiTheme({
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
	},
	fonts: {
		header: "'Oswald', sans-serif"
	}
});

export const darkTheme = createMuiTheme({
	darkMode: true,
	palette: {
		background: {
			primary: '#262626',
			secondary: '#595959',
			nav: '#41003b'
		},
		text: {
			primary: '#e6e6e6',
			secondary: '#cccccc'
		}
	},
	fonts: {
		header: "'Oswald', sans-serif"
	}
});
