import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

const orders = [
	{
		id: 1,
		customer: 'John Doe',
		amount: '$123.45',
		status: 'Completed',
		date: '2025-01-15',
	},
	{
		id: 2,
		customer: 'Jane Smith',
		amount: '$234.56',
		status: 'Pending',
		date: '2025-01-14',
	},
	{
		id: 3,
		customer: 'Bob Johnson',
		amount: '$345.67',
		status: 'Processing',
		date: '2025-01-13',
	},
	{
		id: 4,
		customer: 'Alice Brown',
		amount: '$456.78',
		status: 'Completed',
		date: '2025-01-12',
	},
];

export default function Orders() {
	return (
		<Box sx={{ p: 3 }}>
			<Typography variant='h4' component='h1' gutterBottom>
				Orders
			</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label='orders table'>
					<TableHead>
						<TableRow>
							<TableCell>Order ID</TableCell>
							<TableCell>Customer</TableCell>
							<TableCell>Amount</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Date</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{orders.map(order => (
							<TableRow key={order.id}>
								<TableCell>{order.id}</TableCell>
								<TableCell>{order.customer}</TableCell>
								<TableCell>{order.amount}</TableCell>
								<TableCell>
									<Chip
										label={order.status}
										color={
											order.status === 'Completed'
												? 'success'
												: order.status === 'Processing'
													? 'warning'
													: 'default'
										}
									/>
								</TableCell>
								<TableCell>{order.date}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
}
