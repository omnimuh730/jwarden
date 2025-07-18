import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function Dashboard() {
	return (
		<Box sx={{ p: 3 }}>
			<Typography variant='h4' component='h1' gutterBottom>
				Dashboard
			</Typography>
			<Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
				<Card sx={{ minWidth: 275, flex: '1 1 300px' }}>
					<CardContent>
						<Typography variant='h6' component='h2'>
							Total Orders
						</Typography>
						<Typography variant='h3' color='primary'>
							1,234
						</Typography>
					</CardContent>
				</Card>
				<Card sx={{ minWidth: 275, flex: '1 1 300px' }}>
					<CardContent>
						<Typography variant='h6' component='h2'>
							Revenue
						</Typography>
						<Typography variant='h3' color='primary'>
							$12,345
						</Typography>
					</CardContent>
				</Card>
				<Card sx={{ minWidth: 275, flex: '1 1 300px' }}>
					<CardContent>
						<Typography variant='h6' component='h2'>
							Active Users
						</Typography>
						<Typography variant='h3' color='primary'>
							567
						</Typography>
					</CardContent>
				</Card>
			</Box>
		</Box>
	);
}
