import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function TrafficReport() {
	return (
		<Box sx={{ p: 3 }}>
			<Typography variant='h4' component='h1' gutterBottom>
				Traffic Report
			</Typography>
			<Typography variant='body1'>
				Website traffic analytics and reporting will be displayed here.
			</Typography>
		</Box>
	);
}
