import { promises as fs } from 'fs';
import path from 'path';
import { authenticate } from '@google-cloud/local-auth';
import { google } from 'googleapis';
import { OAuth2Client } from 'googleapis-common';

// Define the scopes for Gmail API
const SCOPES = [
	'https://www.googleapis.com/auth/gmail.readonly',
	'https://www.googleapis.com/auth/gmail.send',
	'https://www.googleapis.com/auth/gmail.modify',
	'https://www.googleapis.com/auth/gmail.labels',
	'https://www.googleapis.com/auth/gmail.compose',
];

// Path to the client secret file
const CREDENTIALS_PATH = path.join(process.cwd(), 'client_secret.json');
const TOKEN_PATH = path.join(process.cwd(), 'token.json');

/**
 * Reads previously authorized credentials from the save file
 */
async function loadSavedCredentialsIfExist(): Promise<OAuth2Client | null> {
	try {
		const content = await fs.readFile(TOKEN_PATH);
		const credentials = JSON.parse(content.toString());
		return google.auth.fromJSON(credentials) as OAuth2Client;
	} catch (error) {
		console.log('No saved credentials found');
		return null;
	}
}

/**
 * Serializes credentials to a file compatible with GoogleAuth
 */
async function saveCredentials(client: OAuth2Client): Promise<void> {
	const content = await fs.readFile(CREDENTIALS_PATH);
	const keys = JSON.parse(content.toString());
	const key = keys.installed || keys.web;
	const payload = JSON.stringify({
		type: 'authorized_user',
		client_id: key.client_id,
		client_secret: key.client_secret,
		refresh_token: client.credentials.refresh_token,
	});
	await fs.writeFile(TOKEN_PATH, payload);
}

/**
 * Load or request or authorization to call APIs
 */
export async function authorize(): Promise<OAuth2Client> {
	let client = await loadSavedCredentialsIfExist();
	if (client) {
		return client;
	}
	const authClient = await authenticate({
		scopes: SCOPES,
		keyfilePath: CREDENTIALS_PATH,
	});
	client = authClient as unknown as OAuth2Client;
	if (client.credentials) {
		await saveCredentials(client);
	}
	return client;
}

/**
 * Get authorized Gmail client
 */
export async function getGmailClient() {
	const auth = await authorize();
	return google.gmail({ version: 'v1', auth });
}

export { SCOPES };
