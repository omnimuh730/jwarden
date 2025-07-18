import { Request, Response, NextFunction } from 'express';

/**
 * Global error handler middleware
 */
export const errorHandler = (
	error: any,
	_req: Request,
	res: Response,
	_next: NextFunction
): void => {
	console.error('Error:', error);

	// Gmail API specific errors
	if (error.code === 401) {
		res.status(401).json({
			success: false,
			error: 'Gmail authentication required',
			details: 'Please authenticate with Gmail API first',
		});
		return;
	}

	if (error.code === 403) {
		res.status(403).json({
			success: false,
			error: 'Gmail access forbidden',
			details: 'Insufficient permissions for Gmail API',
		});
		return;
	}

	if (error.code === 404) {
		res.status(404).json({
			success: false,
			error: 'Gmail resource not found',
			details: error.message || 'The requested resource was not found',
		});
		return;
	}

	if (error.code === 429) {
		res.status(429).json({
			success: false,
			error: 'Gmail API rate limit exceeded',
			details: 'Too many requests. Please try again later.',
		});
		return;
	}

	// Generic server error
	res.status(500).json({
		success: false,
		error: 'Internal server error',
		details: error.message || 'An unexpected error occurred',
	});
};
