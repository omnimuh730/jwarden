import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function SalesReport() {
	return (
		<Box sx={{ p: 3 }}>
			<Typography variant='h4' component='h1' gutterBottom>
				Sales Report
			</Typography>
			<Typography variant='body1'>
				Sales analytics and reporting will be displayed here.
			</Typography>
		</Box>
	);
}
