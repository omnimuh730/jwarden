import { gmail_v1 } from 'googleapis';
import { getGmailClient } from '../config/gmail.js';

export interface EmailMessage {
	id: string;
	threadId: string;
	labelIds: string[];
	snippet: string;
	payload: gmail_v1.Schema$MessagePart;
	sizeEstimate: number;
	historyId: string;
	internalDate: string;
	raw?: string;
}

export interface EmailList {
	messages: EmailMessage[];
	nextPageToken?: string | undefined;
	resultSizeEstimate: number;
}

export interface Label {
	id: string;
	name: string;
	messageListVisibility: string;
	labelListVisibility: string;
	type: string;
	messagesTotal?: number;
	messagesUnread?: number;
	threadsTotal?: number;
	threadsUnread?: number;
}

export interface EmailThread {
	id: string;
	historyId: string;
	messages: EmailMessage[];
}

export interface SendEmailRequest {
	to: string;
	subject: string;
	body: string;
	html?: string | undefined;
	cc?: string;
	bcc?: string;
	replyTo?: string;
}

export interface DraftRequest {
	to: string;
	subject: string;
	body: string;
	html?: string | undefined;
	cc?: string;
	bcc?: string;
}

export class GmailService {
	private gmailClient: gmail_v1.Gmail | null = null;

	private async getClient(): Promise<gmail_v1.Gmail> {
		if (!this.gmailClient) {
			this.gmailClient = await getGmailClient();
		}
		return this.gmailClient;
	}

	/**
	 * Get user profile information
	 */
	async getProfile(): Promise<gmail_v1.Schema$Profile> {
		const gmail = await this.getClient();
		const response = await gmail.users.getProfile({ userId: 'me' });
		return response.data;
	}

	/**
	 * List messages with optional query and pagination
	 */
	async listMessages(
		query?: string,
		maxResults: number = 50,
		pageToken?: string,
		labelIds?: string[]
	): Promise<EmailList> {
		const gmail = await this.getClient();

		const params: any = {
			userId: 'me',
			maxResults,
		};

		if (query) params.q = query;
		if (pageToken) params.pageToken = pageToken;
		if (labelIds) params.labelIds = labelIds;

		const response = await gmail.users.messages.list(params);

		const messages = response.data.messages || [];
		const detailedMessages: EmailMessage[] = [];

		// Get detailed information for each message
		for (const message of messages) {
			if (message.id) {
				const detail = await this.getMessage(message.id);
				detailedMessages.push(detail);
			}
		}

		return {
			messages: detailedMessages,
			nextPageToken: response.data.nextPageToken || undefined,
			resultSizeEstimate: response.data.resultSizeEstimate || 0,
		};
	}

	/**
	 * Get a specific message by ID
	 */
	async getMessage(messageId: string): Promise<EmailMessage> {
		const gmail = await this.getClient();
		const response = await gmail.users.messages.get({
			userId: 'me',
			id: messageId,
		});

		return response.data as EmailMessage;
	}

	/**
	 * Search messages with query
	 */
	async searchMessages(
		query: string,
		maxResults: number = 20
	): Promise<EmailMessage[]> {
		const result = await this.listMessages(query, maxResults);
		return result.messages;
	}

	/**
	 * Get messages by label
	 */
	async getMessagesByLabel(
		labelName: string,
		maxResults: number = 20
	): Promise<EmailMessage[]> {
		const labels = await this.listLabels();
		const label = labels.find(
			l => l.name.toLowerCase() === labelName.toLowerCase()
		);

		if (!label) {
			throw new Error(`Label "${labelName}" not found`);
		}

		const result = await this.listMessages(
			undefined,
			maxResults,
			undefined,
			[label.id]
		);
		return result.messages;
	}

	/**
	 * Get unread messages
	 */
	async getUnreadMessages(maxResults: number = 20): Promise<EmailMessage[]> {
		return this.searchMessages('is:unread', maxResults);
	}

	/**
	 * Get sent messages
	 */
	async getSentMessages(maxResults: number = 20): Promise<EmailMessage[]> {
		return this.searchMessages('in:sent', maxResults);
	}

	/**
	 * Get inbox messages
	 */
	async getInboxMessages(maxResults: number = 20): Promise<EmailMessage[]> {
		return this.getMessagesByLabel('INBOX', maxResults);
	}

	/**
	 * Send an email
	 */
	async sendEmail(emailRequest: SendEmailRequest): Promise<EmailMessage> {
		const gmail = await this.getClient();

		// Create email message
		const messageParts = [
			`To: ${emailRequest.to}`,
			`Subject: ${emailRequest.subject}`,
		];

		if (emailRequest.cc) {
			messageParts.push(`Cc: ${emailRequest.cc}`);
		}
		if (emailRequest.bcc) {
			messageParts.push(`Bcc: ${emailRequest.bcc}`);
		}
		if (emailRequest.replyTo) {
			messageParts.push(`Reply-To: ${emailRequest.replyTo}`);
		}

		messageParts.push('Content-Type: text/html; charset=utf-8');
		messageParts.push('MIME-Version: 1.0');
		messageParts.push('');

		if (emailRequest.html) {
			messageParts.push(emailRequest.html);
		} else {
			messageParts.push(emailRequest.body);
		}

		const message = messageParts.join('\n');
		const encodedMessage = Buffer.from(message)
			.toString('base64')
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');

		const response = await gmail.users.messages.send({
			userId: 'me',
			requestBody: {
				raw: encodedMessage,
			},
		});

		return response.data as EmailMessage;
	}

	/**
	 * Reply to an email
	 */
	async replyToEmail(
		messageId: string,
		body: string,
		html?: string
	): Promise<EmailMessage> {
		const originalMessage = await this.getMessage(messageId);
		const originalHeaders = originalMessage.payload.headers || [];

		const fromHeader = originalHeaders.find(h => h.name === 'From');
		const subjectHeader = originalHeaders.find(h => h.name === 'Subject');

		if (!fromHeader?.value) {
			throw new Error('Cannot determine sender of original message');
		}

		const replySubject = subjectHeader?.value?.startsWith('Re:')
			? subjectHeader.value
			: `Re: ${subjectHeader?.value || ''}`;

		const emailRequest: SendEmailRequest = {
			to: fromHeader.value,
			subject: replySubject,
			body,
		};

		if (html) {
			emailRequest.html = html;
		}

		return this.sendEmail(emailRequest);
	}

	/**
	 * Forward an email
	 */
	async forwardEmail(
		messageId: string,
		to: string,
		additionalBody?: string
	): Promise<EmailMessage> {
		const originalMessage = await this.getMessage(messageId);
		const originalHeaders = originalMessage.payload.headers || [];

		const fromHeader = originalHeaders.find(h => h.name === 'From');
		const subjectHeader = originalHeaders.find(h => h.name === 'Subject');
		const dateHeader = originalHeaders.find(h => h.name === 'Date');

		const forwardSubject = subjectHeader?.value?.startsWith('Fwd:')
			? subjectHeader.value
			: `Fwd: ${subjectHeader?.value || ''}`;

		// Extract body from original message
		const originalBody = this.extractTextFromMessage(originalMessage);

		const forwardedContent = [
			additionalBody || '',
			'',
			'---------- Forwarded message ----------',
			`From: ${fromHeader?.value || 'Unknown'}`,
			`Date: ${dateHeader?.value || 'Unknown'}`,
			`Subject: ${subjectHeader?.value || 'No Subject'}`,
			'',
			originalBody,
		].join('\n');

		return this.sendEmail({
			to,
			subject: forwardSubject,
			body: forwardedContent,
		});
	}

	/**
	 * Create a draft
	 */
	async createDraft(
		draftRequest: DraftRequest
	): Promise<gmail_v1.Schema$Draft> {
		const gmail = await this.getClient();

		const messageParts = [
			`To: ${draftRequest.to}`,
			`Subject: ${draftRequest.subject}`,
		];

		if (draftRequest.cc) {
			messageParts.push(`Cc: ${draftRequest.cc}`);
		}
		if (draftRequest.bcc) {
			messageParts.push(`Bcc: ${draftRequest.bcc}`);
		}

		messageParts.push('Content-Type: text/html; charset=utf-8');
		messageParts.push('MIME-Version: 1.0');
		messageParts.push('');

		if (draftRequest.html) {
			messageParts.push(draftRequest.html);
		} else {
			messageParts.push(draftRequest.body);
		}

		const message = messageParts.join('\n');
		const encodedMessage = Buffer.from(message)
			.toString('base64')
			.replace(/\+/g, '-')
			.replace(/\//g, '_')
			.replace(/=+$/, '');

		const response = await gmail.users.drafts.create({
			userId: 'me',
			requestBody: {
				message: {
					raw: encodedMessage,
				},
			},
		});

		return response.data;
	}

	/**
	 * List all labels
	 */
	async listLabels(): Promise<Label[]> {
		const gmail = await this.getClient();
		const response = await gmail.users.labels.list({ userId: 'me' });
		return (response.data.labels || []) as Label[];
	}

	/**
	 * Create a new label
	 */
	async createLabel(
		name: string,
		messageListVisibility: 'show' | 'hide' = 'show',
		labelListVisibility:
			| 'labelShow'
			| 'labelShowIfUnread'
			| 'labelHide' = 'labelShow'
	): Promise<Label> {
		const gmail = await this.getClient();
		const response = await gmail.users.labels.create({
			userId: 'me',
			requestBody: {
				name,
				messageListVisibility,
				labelListVisibility,
			},
		});
		return response.data as Label;
	}

	/**
	 * Add labels to a message
	 */
	async addLabelsToMessage(
		messageId: string,
		labelIds: string[]
	): Promise<EmailMessage> {
		const gmail = await this.getClient();
		const response = await gmail.users.messages.modify({
			userId: 'me',
			id: messageId,
			requestBody: {
				addLabelIds: labelIds,
			},
		});
		return response.data as EmailMessage;
	}

	/**
	 * Remove labels from a message
	 */
	async removeLabelsFromMessage(
		messageId: string,
		labelIds: string[]
	): Promise<EmailMessage> {
		const gmail = await this.getClient();
		const response = await gmail.users.messages.modify({
			userId: 'me',
			id: messageId,
			requestBody: {
				removeLabelIds: labelIds,
			},
		});
		return response.data as EmailMessage;
	}

	/**
	 * Mark message as read
	 */
	async markAsRead(messageId: string): Promise<EmailMessage> {
		return this.removeLabelsFromMessage(messageId, ['UNREAD']);
	}

	/**
	 * Mark message as unread
	 */
	async markAsUnread(messageId: string): Promise<EmailMessage> {
		return this.addLabelsToMessage(messageId, ['UNREAD']);
	}

	/**
	 * Archive a message
	 */
	async archiveMessage(messageId: string): Promise<EmailMessage> {
		return this.removeLabelsFromMessage(messageId, ['INBOX']);
	}

	/**
	 * Move message to trash
	 */
	async trashMessage(messageId: string): Promise<EmailMessage> {
		const gmail = await this.getClient();
		const response = await gmail.users.messages.trash({
			userId: 'me',
			id: messageId,
		});
		return response.data as EmailMessage;
	}

	/**
	 * Delete a message permanently
	 */
	async deleteMessage(messageId: string): Promise<void> {
		const gmail = await this.getClient();
		await gmail.users.messages.delete({
			userId: 'me',
			id: messageId,
		});
	}

	/**
	 * Get thread by ID
	 */
	async getThread(threadId: string): Promise<EmailThread> {
		const gmail = await this.getClient();
		const response = await gmail.users.threads.get({
			userId: 'me',
			id: threadId,
		});
		return response.data as EmailThread;
	}

	/**
	 * List threads
	 */
	async listThreads(
		query?: string,
		maxResults: number = 20,
		pageToken?: string
	): Promise<{ threads: EmailThread[]; nextPageToken?: string | undefined }> {
		const gmail = await this.getClient();

		const params: any = {
			userId: 'me',
			maxResults,
		};

		if (query) params.q = query;
		if (pageToken) params.pageToken = pageToken;

		const response = await gmail.users.threads.list(params);

		const threads = response.data.threads || [];
		const detailedThreads: EmailThread[] = [];

		for (const thread of threads) {
			if (thread.id) {
				const detail = await this.getThread(thread.id);
				detailedThreads.push(detail);
			}
		}

		return {
			threads: detailedThreads,
			nextPageToken: response.data.nextPageToken || undefined,
		};
	}

	/**
	 * Extract text content from message
	 */
	private extractTextFromMessage(message: EmailMessage): string {
		let text = '';

		const extractText = (part: gmail_v1.Schema$MessagePart): void => {
			if (part.body?.data) {
				const data = part.body.data
					.replace(/-/g, '+')
					.replace(/_/g, '/');
				text += Buffer.from(data, 'base64').toString();
			}

			if (part.parts) {
				part.parts.forEach(extractText);
			}
		};

		if (message.payload) {
			extractText(message.payload);
		}

		return text;
	}

	/**
	 * Get message body (plain text or HTML)
	 */
	getMessageBody(message: EmailMessage): {
		text: string;
		html?: string | undefined;
	} {
		let textBody = '';
		let htmlBody = '';

		const extractBody = (part: gmail_v1.Schema$MessagePart): void => {
			if (part.mimeType === 'text/plain' && part.body?.data) {
				const data = part.body.data
					.replace(/-/g, '+')
					.replace(/_/g, '/');
				textBody += Buffer.from(data, 'base64').toString();
			} else if (part.mimeType === 'text/html' && part.body?.data) {
				const data = part.body.data
					.replace(/-/g, '+')
					.replace(/_/g, '/');
				htmlBody += Buffer.from(data, 'base64').toString();
			}

			if (part.parts) {
				part.parts.forEach(extractBody);
			}
		};

		if (message.payload) {
			extractBody(message.payload);
		}

		const result: { text: string; html?: string | undefined } = {
			text: textBody || this.extractTextFromMessage(message),
		};

		if (htmlBody) {
			result.html = htmlBody;
		}

		return result;
	}
}

export const gmailService = new GmailService();
