import { Router, Request, Response, NextFunction } from 'express';
import { gmailService } from '../services/gmailService.js';

const router = Router();

// Error handler wrapper
const asyncHandler =
	(fn: (req: Request, res: Response, next?: NextFunction) => Promise<any>) =>
	(req: Request, res: Response, next: NextFunction): void => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};

/**
 * GET /profile
 * Get user's Gmail profile information
 */
router.get(
	'/profile',
	asyncHandler(async (_req: Request, res: Response) => {
		const profile = await gmailService.getProfile();
		res.json({
			success: true,
			data: profile,
		});
	})
);

/**
 * GET /messages
 * List messages with optional query parameters
 * Query params: q (search query), maxResults, pageToken, labelIds
 */
router.get(
	'/messages',
	asyncHandler(async (req: Request, res: Response) => {
		const { q, maxResults = 50, pageToken, labelIds } = req.query;

		const labelIdsArray = labelIds
			? Array.isArray(labelIds)
				? (labelIds as string[])
				: [labelIds as string]
			: undefined;

		const result = await gmailService.listMessages(
			q as string,
			parseInt(maxResults as string, 10),
			pageToken as string,
			labelIdsArray
		);

		res.json({
			success: true,
			data: result,
		});
	})
);

/**
 * GET /messages/inbox
 * Get inbox messages
 */
router.get(
	'/messages/inbox',
	asyncHandler(async (req: Request, res: Response) => {
		const { maxResults = 20 } = req.query;
		const messages = await gmailService.getInboxMessages(
			parseInt(maxResults as string, 10)
		);

		res.json({
			success: true,
			data: messages,
		});
	})
);

/**
 * GET /messages/unread
 * Get unread messages
 */
router.get(
	'/messages/unread',
	asyncHandler(async (req: Request, res: Response) => {
		const { maxResults = 20 } = req.query;
		const messages = await gmailService.getUnreadMessages(
			parseInt(maxResults as string, 10)
		);

		res.json({
			success: true,
			data: messages,
		});
	})
);

/**
 * GET /messages/sent
 * Get sent messages
 */
router.get(
	'/messages/sent',
	asyncHandler(async (req: Request, res: Response) => {
		const { maxResults = 20 } = req.query;
		const messages = await gmailService.getSentMessages(
			parseInt(maxResults as string, 10)
		);

		res.json({
			success: true,
			data: messages,
		});
	})
);

/**
 * GET /messages/:id
 * Get a specific message by ID
 */
router.get(
	'/messages/:id',
	asyncHandler(async (req: Request, res: Response) => {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({
				success: false,
				error: 'Message ID is required',
			});
		}

		const message = await gmailService.getMessage(id);

		res.json({
			success: true,
			data: message,
		});
	})
);

/**
 * GET /messages/:id/body
 * Get message body content
 */
router.get(
	'/messages/:id/body',
	asyncHandler(async (req: Request, res: Response) => {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({
				success: false,
				error: 'Message ID is required',
			});
		}

		const message = await gmailService.getMessage(id);
		const body = gmailService.getMessageBody(message);

		res.json({
			success: true,
			data: body,
		});
	})
);

/**
 * POST /messages/send
 * Send a new email
 */
router.post(
	'/messages/send',
	asyncHandler(async (req: Request, res: Response) => {
		const { to, subject, body, html, cc, bcc, replyTo } = req.body;

		if (!to || !subject || !body) {
			return res.status(400).json({
				success: false,
				error: 'Missing required fields: to, subject, body',
			});
		}

		const result = await gmailService.sendEmail({
			to,
			subject,
			body,
			html,
			cc,
			bcc,
			replyTo,
		});

		res.json({
			success: true,
			data: result,
		});
	})
);

/**
 * POST /messages/:id/reply
 * Reply to a message
 */
router.post(
	'/messages/:id/reply',
	asyncHandler(async (req: Request, res: Response) => {
		const { id } = req.params;
		const { body, html } = req.body;

		if (!id) {
			return res.status(400).json({
				success: false,
				error: 'Message ID is required',
			});
		}

		if (!body) {
			return res.status(400).json({
				success: false,
				error: 'Missing required field: body',
			});
		}

		const result = await gmailService.replyToEmail(id, body, html);

		res.json({
			success: true,
			data: result,
		});
	})
);

/**
 * POST /messages/:id/forward
 * Forward a message
 */
router.post(
	'/messages/:id/forward',
	asyncHandler(async (req: Request, res: Response) => {
		const { id } = req.params;
		const { to, additionalBody } = req.body;

		if (!id) {
			return res.status(400).json({
				success: false,
				error: 'Message ID is required',
			});
		}

		if (!to) {
			return res.status(400).json({
				success: false,
				error: 'Missing required field: to',
			});
		}

		const result = await gmailService.forwardEmail(id, to, additionalBody);

		res.json({
			success: true,
			data: result,
		});
	})
);

/**
 * POST /messages/search
 * Search messages
 */
router.post(
	'/messages/search',
	asyncHandler(async (req: Request, res: Response) => {
		const { query, maxResults = 20 } = req.body;

		if (!query) {
			return res.status(400).json({
				success: false,
				error: 'Missing required field: query',
			});
		}

		const messages = await gmailService.searchMessages(
			query,
			parseInt(maxResults as string, 10)
		);

		res.json({
			success: true,
			data: messages,
		});
	})
);

/**
 * PATCH /messages/:id/read
 * Mark message as read
 */
router.patch(
	'/messages/:id/read',
	asyncHandler(async (req: Request, res: Response) => {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({
				success: false,
				error: 'Message ID is required',
			});
		}

		const result = await gmailService.markAsRead(id);

		res.json({
			success: true,
			data: result,
		});
	})
);

/**
 * PATCH /messages/:id/unread
 * Mark message as unread
 */
router.patch(
	'/messages/:id/unread',
	asyncHandler(async (req: Request, res: Response) => {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({
				success: false,
				error: 'Message ID is required',
			});
		}

		const result = await gmailService.markAsUnread(id);

		res.json({
			success: true,
			data: result,
		});
	})
);

/**
 * PATCH /messages/:id/archive
 * Archive a message
 */
router.patch(
	'/messages/:id/archive',
	asyncHandler(async (req: Request, res: Response) => {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({
				success: false,
				error: 'Message ID is required',
			});
		}

		const result = await gmailService.archiveMessage(id);

		res.json({
			success: true,
			data: result,
		});
	})
);

/**
 * DELETE /messages/:id/trash
 * Move message to trash
 */
router.delete(
	'/messages/:id/trash',
	asyncHandler(async (req: Request, res: Response) => {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({
				success: false,
				error: 'Message ID is required',
			});
		}

		const result = await gmailService.trashMessage(id);

		res.json({
			success: true,
			data: result,
		});
	})
);

/**
 * DELETE /messages/:id
 * Delete message permanently
 */
router.delete(
	'/messages/:id',
	asyncHandler(async (req: Request, res: Response) => {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({
				success: false,
				error: 'Message ID is required',
			});
		}

		await gmailService.deleteMessage(id);

		res.json({
			success: true,
			message: 'Message deleted successfully',
		});
	})
);

/**
 * GET /labels
 * List all labels
 */
router.get(
	'/labels',
	asyncHandler(async (_req: Request, res: Response) => {
		const labels = await gmailService.listLabels();

		res.json({
			success: true,
			data: labels,
		});
	})
);

/**
 * POST /labels
 * Create a new label
 */
router.post(
	'/labels',
	asyncHandler(async (req: Request, res: Response) => {
		const {
			name,
			messageListVisibility = 'show',
			labelListVisibility = 'labelShow',
		} = req.body;

		if (!name) {
			return res.status(400).json({
				success: false,
				error: 'Missing required field: name',
			});
		}

		const label = await gmailService.createLabel(
			name,
			messageListVisibility,
			labelListVisibility
		);

		res.json({
			success: true,
			data: label,
		});
	})
);

/**
 * PATCH /messages/:id/labels
 * Add/remove labels from a message
 */
router.patch(
	'/messages/:id/labels',
	asyncHandler(async (req: Request, res: Response) => {
		const { id } = req.params;
		const { addLabelIds, removeLabelIds } = req.body;

		if (!id) {
			return res.status(400).json({
				success: false,
				error: 'Message ID is required',
			});
		}

		let result;

		if (addLabelIds && addLabelIds.length > 0) {
			result = await gmailService.addLabelsToMessage(id, addLabelIds);
		}

		if (removeLabelIds && removeLabelIds.length > 0) {
			result = await gmailService.removeLabelsFromMessage(
				id,
				removeLabelIds
			);
		}

		if (!addLabelIds && !removeLabelIds) {
			return res.status(400).json({
				success: false,
				error: 'Either addLabelIds or removeLabelIds must be provided',
			});
		}

		res.json({
			success: true,
			data: result,
		});
	})
);

/**
 * GET /threads
 * List email threads
 */
router.get(
	'/threads',
	asyncHandler(async (req: Request, res: Response) => {
		const { q, maxResults = 20, pageToken } = req.query;

		const result = await gmailService.listThreads(
			q as string,
			parseInt(maxResults as string, 10),
			pageToken as string
		);

		res.json({
			success: true,
			data: result,
		});
	})
);

/**
 * GET /threads/:id
 * Get a specific thread by ID
 */
router.get(
	'/threads/:id',
	asyncHandler(async (req: Request, res: Response) => {
		const { id } = req.params;
		if (!id) {
			return res.status(400).json({
				success: false,
				error: 'Thread ID is required',
			});
		}

		const thread = await gmailService.getThread(id);

		res.json({
			success: true,
			data: thread,
		});
	})
);

/**
 * POST /drafts
 * Create a draft
 */
router.post(
	'/drafts',
	asyncHandler(async (req: Request, res: Response) => {
		const { to, subject, body, html, cc, bcc } = req.body;

		if (!to || !subject || !body) {
			return res.status(400).json({
				success: false,
				error: 'Missing required fields: to, subject, body',
			});
		}

		const draft = await gmailService.createDraft({
			to,
			subject,
			body,
			html,
			cc,
			bcc,
		});

		res.json({
			success: true,
			data: draft,
		});
	})
);

export default router;
