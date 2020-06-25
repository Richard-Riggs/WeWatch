import { createMuiTheme } from '@material-ui/core/styles';

const shared = {
	fonts: {
		header: "'Oswald', sans-serif"
	},
	typography: {
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(',')
	}
};

export const lightTheme = createMuiTheme({
	...shared,
	darkMode: false,
	palette: {
		primary: {
			main: '#3c3ab7'
		},
		secondary: {
			main: '#bb002f'
		},
		background: {
			primary: '#f2f2f2',
			secondary: '#e6e6e6',
			nav: '#600058',
			gradient: 'linear-gradient(315deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)'
		},
		text: {
			primary: '#1a1a1a',
			secondary: '#666666',
			logo: '#600080',
			header: '#4b0066'
		}
	}
});

export const darkTheme = createMuiTheme({
	...shared,
	darkMode: true,
	palette: {
		primary: {
			main: '#3c3ab7'
		},
		secondary: {
			main: '#bb002f'
		},
		background: {
			primary: '#26222a',
			// secondary: '#403d43',
			secondary: '#333036',
			nav: '#41003b',
			// gradient: 'linear-gradient(45deg, rgba(12,0,17,1) 0%, rgba(37,0,50,1) 100%)'
			gradient: 'linear-gradient(45deg, rgba(7,0,10,1) 0%, rgba(37,0,50,1) 100%)'
		},
		text: {
			primary: '#e6e6e6',
			secondary: '#999999',
			logo: '#8600b3',
			header: '#e6e6e6'
		}
	}
});
