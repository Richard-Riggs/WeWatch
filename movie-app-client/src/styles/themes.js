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
			primary: '#f2f2f2',
			secondary: '#e6e6e6',
			nav: '#600058'
		},
		text: {
			primary: '#1a1a1a',
			secondary: '#666666',
			logo: '#600080'
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
			nav: '#41003b',
			gradient: 'linear-gradient(45deg, rgba(12,0,17,1) 0%, rgba(37,0,50,1) 100%)'
		},
		text: {
			primary: '#e6e6e6',
			secondary: '#999999',
			logo: '#8600b3'
		}
	}
});
