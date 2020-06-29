import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import useStyles from './styles';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';

export default function SaveOptionsDialog({ open, setStage }) {
	const classes = useStyles();
	const handleClose = () => setStage('');
	return (
		<Dialog className={classes.root} open={open} onClose={handleClose}>
			<DialogTitle className={classes.title}>Save Movies</DialogTitle>
			<DialogContent>
				<List>
					<ListItem button onClick={() => setStage('addToList')}>
						<ListItemIcon>
							<AddCircleRoundedIcon fontSize="large" color="primary" />
						</ListItemIcon>
						<ListItemText className={classes.optionText} primary="Add to existing list" />
					</ListItem>
					<ListItem button onClick={() => setStage('newList')}>
						<ListItemIcon>
							<SaveRoundedIcon fontSize="large" color="secondary" />
						</ListItemIcon>
						<ListItemText className={classes.optionText} primary="Create new list" />
					</ListItem>
				</List>
			</DialogContent>
		</Dialog>
	);
}
