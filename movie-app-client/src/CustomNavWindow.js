import React from 'react';
import Navbar from './Navbar';
import { Scrollbars } from 'react-custom-scrollbars';
import Toolbar from '@material-ui/core/Toolbar';
import useStyles from './styles/CustomNavWindowStyles';
import { isMobile } from 'react-device-detect';

function NavbarOffset({ children }) {
	return (
		<React.Fragment>
			<Toolbar />
			<div style={{ position: 'relative', height: '100%' }}>{children}</div>
		</React.Fragment>
	);
}

export default function CustomNavWindow({ children }) {
	const classes = useStyles();

	// Conditionally render custom scroller based on device type
	const renderContent = () => {
		if (isMobile) {
			return (
				<React.Fragment>
					<Navbar />
					<NavbarOffset>{children}</NavbarOffset>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<Navbar />
					<div className={classes.appWindow}>
						<NavbarOffset>
							<Scrollbars
								renderView={(props) => <div {...props} id="scroller" />}
								renderThumbVertical={(props) => <div {...props} className={classes.verticalScroll} />}
								autoHide
							>
								{children}
							</Scrollbars>
						</NavbarOffset>
					</div>
				</React.Fragment>
			);
		}
	};

	return renderContent();
}
