import express from 'express';
import dotenv from 'dotenv';

import apiRoutes from './routes/api.js';
import gmailRoutes from './routes/gmail.js';
import { errorHandler } from './middleware/errorHandler.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env['PORT'] || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS, PATCH'
	);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);

	if (req.method === 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}
});

// Routes
app.use('/api', apiRoutes);
app.use('/api/gmail', gmailRoutes);

app.get('/', (_req, res) => {
	res.json({
		message: 'Gmail Backend API Server',
		version: '1.0.0',
		timestamp: new Date().toISOString(),
		environment: process.env['NODE_ENV'] || 'development',
		endpoints: {
			health: '/api/health',
			api: '/api',
			gmail: '/api/gmail',
		},
	});
});

app.get('/api/health', (_req, res) => {
	res.json({
		status: 'healthy',
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
	});
});

// Error handling middleware
app.use(errorHandler);

// Note: 404 handler with wildcard routes causes path-to-regexp issues
// For production, consider using a specific catch-all pattern

// Start server
app.listen(PORT, () => {
	console.log(
		`🚀 Gmail Backend API Server running on http://localhost:${PORT}`
	);
	console.log(`📧 Gmail API endpoints: http://localhost:${PORT}/api/gmail`);
	console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
	console.log(`🌍 Environment: ${process.env['NODE_ENV'] || 'development'}`);
});

export default app;
