import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Integrations() {
	return (
		<Box sx={{ p: 3 }}>
			<Typography variant='h4' component='h1' gutterBottom>
				Integrations
			</Typography>
			<Typography variant='body1'>
				System integrations and API connections will be managed here.
			</Typography>
		</Box>
	);
}
