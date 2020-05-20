import React from 'react';
import { useTheme } from '@material-ui/core/styles';

export default function MovieCard({ title }) {
	const theme = useTheme();
	console.log(theme);
	return (
		<div>
			<span>{title}</span>
		</div>
	);
}
