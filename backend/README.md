# Gmail Backend API

A comprehensive Gmail API backend service built with Express.js and TypeScript that provides rich functionality for Gmail integration.

## Features

- 📧 **Email Management**: Send, reply, forward, search, and manage emails
- 🏷️ **Label Management**: Create, list, and manage Gmail labels
- 📂 **Thread Management**: Work with email conversations
- 📝 **Draft Management**: Create and manage email drafts
- 🔐 **OAuth2 Authentication**: Secure Google authentication
- 🎯 **Rich Filtering**: Advanced email search and filtering
- 📊 **Comprehensive API**: RESTful endpoints for all Gmail operations

## Setup

### Prerequisites

1. **Google Cloud Project**: Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. **Gmail API**: Enable the Gmail API for your project
3. **OAuth2 Credentials**: Create OAuth2 credentials and download `client_secret.json`

### Installation

1. Place your `client_secret.json` file in the backend root directory
2. Install dependencies:
    ```bash
    yarn install
    ```
3. Start the development server:
    ```bash
    yarn dev
    ```

### Authentication

On first use, the API will prompt for Gmail authentication. The OAuth2 flow will:

1. Open a browser for Google authentication
2. Request necessary Gmail permissions
3. Save authentication tokens locally

## API Endpoints

### Base URL

```
http://localhost:3001/api/gmail
```

### Authentication & Profile

#### Get Profile

```http
GET /profile
```

Returns user's Gmail profile information.

### Email Management

#### List Messages

```http
GET /messages?q={query}&maxResults={number}&pageToken={token}&labelIds={ids}
```

- `q`: Search query (optional)
- `maxResults`: Number of results (default: 50)
- `pageToken`: Pagination token (optional)
- `labelIds`: Comma-separated label IDs (optional)

#### Get Inbox Messages

```http
GET /messages/inbox?maxResults={number}
```

#### Get Unread Messages

```http
GET /messages/unread?maxResults={number}
```

#### Get Sent Messages

```http
GET /messages/sent?maxResults={number}
```

#### Get Specific Message

```http
GET /messages/{messageId}
```

#### Get Message Body

```http
GET /messages/{messageId}/body
```

Returns formatted text and HTML content.

#### Send Email

```http
POST /messages/send
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Subject",
  "body": "Plain text body",
  "html": "<p>HTML body</p>",     // optional
  "cc": "cc@example.com",         // optional
  "bcc": "bcc@example.com",       // optional
  "replyTo": "reply@example.com"  // optional
}
```

#### Reply to Email

```http
POST /messages/{messageId}/reply
Content-Type: application/json

{
  "body": "Reply text",
  "html": "<p>HTML reply</p>"  // optional
}
```

#### Forward Email

```http
POST /messages/{messageId}/forward
Content-Type: application/json

{
  "to": "recipient@example.com",
  "additionalBody": "Additional message"  // optional
}
```

#### Search Messages

```http
POST /messages/search
Content-Type: application/json

{
  "query": "from:sender@example.com subject:important",
  "maxResults": 20
}
```

### Email Actions

#### Mark as Read

```http
PATCH /messages/{messageId}/read
```

#### Mark as Unread

```http
PATCH /messages/{messageId}/unread
```

#### Archive Message

```http
PATCH /messages/{messageId}/archive
```

#### Move to Trash

```http
DELETE /messages/{messageId}/trash
```

#### Delete Permanently

```http
DELETE /messages/{messageId}
```

### Label Management

#### List Labels

```http
GET /labels
```

#### Create Label

```http
POST /labels
Content-Type: application/json

{
  "name": "Custom Label",
  "messageListVisibility": "show",      // "show" | "hide"
  "labelListVisibility": "labelShow"    // "labelShow" | "labelShowIfUnread" | "labelHide"
}
```

#### Modify Message Labels

```http
PATCH /messages/{messageId}/labels
Content-Type: application/json

{
  "addLabelIds": ["LABEL_1", "LABEL_2"],      // optional
  "removeLabelIds": ["LABEL_3", "LABEL_4"]    // optional
}
```

### Thread Management

#### List Threads

```http
GET /threads?q={query}&maxResults={number}&pageToken={token}
```

#### Get Thread

```http
GET /threads/{threadId}
```

### Draft Management

#### Create Draft

```http
POST /drafts
Content-Type: application/json

{
  "to": "recipient@example.com",
  "subject": "Draft Subject",
  "body": "Draft body",
  "html": "<p>HTML body</p>",     // optional
  "cc": "cc@example.com",         // optional
  "bcc": "bcc@example.com"        // optional
}
```

## Search Query Examples

The Gmail API supports powerful search queries:

```
from:sender@example.com          # From specific sender
to:recipient@example.com         # To specific recipient
subject:meeting                  # Subject contains "meeting"
has:attachment                   # Has attachments
is:unread                       # Unread messages
is:important                    # Important messages
label:inbox                     # In inbox
after:2023/12/01               # After specific date
before:2024/01/01              # Before specific date
older_than:7d                  # Older than 7 days
newer_than:1d                  # Newer than 1 day
```

## Response Format

All API responses follow this format:

### Success Response

```json
{
	"success": true,
	"data": {
		// Response data
	}
}
```

### Error Response

```json
{
	"success": false,
	"error": "Error description",
	"details": "Detailed error message"
}
```

## Error Codes

- `400`: Bad Request - Missing or invalid parameters
- `401`: Unauthorized - Gmail authentication required
- `403`: Forbidden - Insufficient Gmail permissions
- `404`: Not Found - Resource not found
- `429`: Too Many Requests - Rate limit exceeded
- `500`: Internal Server Error - Server error

## Development

### Start Development Server

```bash
yarn dev
```

### Build for Production

```bash
yarn build
```

### Run Production Server

```bash
yarn start
```

## Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=3001
NODE_ENV=development
```

## Gmail API Scopes

The application requests these Gmail API scopes:

- `https://www.googleapis.com/auth/gmail.readonly`
- `https://www.googleapis.com/auth/gmail.send`
- `https://www.googleapis.com/auth/gmail.modify`
- `https://www.googleapis.com/auth/gmail.labels`
- `https://www.googleapis.com/auth/gmail.compose`

## File Structure

```
backend/
├── src/
│   ├── config/
│   │   └── gmail.ts              # Gmail API configuration
│   ├── middleware/
│   │   └── errorHandler.ts       # Error handling middleware
│   ├── routes/
│   │   ├── api.ts               # Basic API routes
│   │   └── gmail.ts             # Gmail API routes
│   ├── services/
│   │   └── gmailService.ts      # Gmail service layer
│   └── index.ts                 # Main server file
├── client_secret.json           # Google OAuth2 credentials
├── token.json                   # Stored authentication tokens
├── package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License
