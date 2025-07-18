import { Router } from 'express';

const router = Router();

// API Routes
router.get('/status', (_req, res) => {
	res.json({
		status: 'success',
		message: 'API is working correctly',
		timestamp: new Date().toISOString(),
	});
});

router.get('/version', (_req, res) => {
	res.json({
		version: '1.0.0',
		name: 'Backend API',
		node: process.version,
	});
});

export default router;
