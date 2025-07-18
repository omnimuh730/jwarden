import type { IconType } from 'react-icons';

export interface Label {
	id: string;
	name: string;
	color: string; // CSS color variable name e.g., 'var(--label-purple)'
}

export interface Email {
	id: string;
	sender: string;
	subject: string;
	snippet: string;
	timestamp: string;
	isRead: boolean;
	isStarred: boolean;
	labels: Label[];
}

export interface NavLink {
	id: string;
	text: string;
	icon: IconType;
	isActive?: boolean;
}

export interface LabelLink {
	id: string;
	name: string;
	color: string; // CSS color variable name
}
