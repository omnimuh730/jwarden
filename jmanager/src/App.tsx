import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { createTheme } from '@mui/material/styles';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import {
	BrowserRouter,
	Routes,
	Route,
	useNavigate,
	useLocation,
} from 'react-router-dom';
import { useMemo } from 'react';

// Import page components
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import SalesReport from './pages/SalesReport';
import TrafficReport from './pages/TrafficReport';
import Integrations from './pages/Integrations';

const NAVIGATION: Navigation = [
	{
		kind: 'header',
		title: 'Main items',
	},
	{
		segment: 'dashboard',
		title: 'Dashboard',
		icon: <DashboardIcon />,
	},
	{
		segment: 'orders',
		title: 'Orders',
		icon: <ShoppingCartIcon />,
	},
	{
		kind: 'divider',
	},
	{
		kind: 'header',
		title: 'Analytics',
	},
	{
		segment: 'reports',
		title: 'Reports',
		icon: <BarChartIcon />,
		children: [
			{
				segment: 'sales',
				title: 'Sales',
				icon: <DescriptionIcon />,
			},
			{
				segment: 'traffic',
				title: 'Traffic',
				icon: <DescriptionIcon />,
			},
		],
	},
	{
		segment: 'integrations',
		title: 'Integrations',
		icon: <LayersIcon />,
	},
];

const demoTheme = createTheme({
	cssVariables: {
		colorSchemeSelector: 'data-toolpad-color-scheme',
	},
	colorSchemes: { light: true, dark: true },
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 600,
			lg: 1200,
			xl: 1536,
		},
	},
});

// Custom router for Toolpad integration
function useRouter() {
	const navigate = useNavigate();
	const location = useLocation();

	return useMemo(
		() => ({
			pathname: location.pathname,
			searchParams: new URLSearchParams(location.search),
			navigate: (url: string | URL) => {
				if (typeof url === 'string') {
					navigate(url);
				} else {
					navigate(url.pathname + url.search);
				}
			},
		}),
		[navigate, location.pathname, location.search]
	);
}

function DashboardContent() {
	const router = useRouter();

	return (
		<AppProvider navigation={NAVIGATION} router={router} theme={demoTheme}>
			<DashboardLayout>
				<Routes>
					<Route path='/' element={<Dashboard />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/orders' element={<Orders />} />
					<Route path='/reports/sales' element={<SalesReport />} />
					<Route
						path='/reports/traffic'
						element={<TrafficReport />}
					/>
					<Route path='/integrations' element={<Integrations />} />
				</Routes>
			</DashboardLayout>
		</AppProvider>
	);
}

export default function DashboardLayoutBasic() {
	return (
		<BrowserRouter>
			<DashboardContent />
		</BrowserRouter>
	);
}
