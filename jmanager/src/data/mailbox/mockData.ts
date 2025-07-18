import type { Email, Label, NavLink, LabelLink } from '../../types/mailbox';
import {
	FiInbox,
	FiStar,
	FiSend,
	FiFileText,
	FiTrash2,
	FiChevronDown,
} from 'react-icons/fi';

export const labels: { [key: string]: Label } = {
	notify: { id: 'l1', name: 'Notify', color: 'var(--label-dark-gray)' },
	denied: { id: 'l2', name: 'Denied', color: 'var(--label-dark-gray)' },
	focus: { id: 'l3', name: 'Focus', color: 'var(--brand-yellow)' },
	meeting: { id: 'l4', name: 'Meeting', color: 'var(--brand-blue)' },
	application: {
		id: 'l5',
		name: 'Application',
		color: 'var(--label-purple)',
	},
	pdf: { id: 'l6', name: 'PDF', color: 'var(--brand-red)' },
	'ask-schedule': {
		id: 'l7',
		name: 'Ask-Schedule',
		color: 'var(--label-cyan)',
	},
};

export const mockEmails: Email[] = [
	{
		id: 'e1',
		sender: 'Athelas Hiring Team',
		subject: 'Reminder: Your Upcoming Interview with Commure',
		snippet:
			'Hi John, You have an upcoming interview with Commure + Athelas for the Senior Frontend Engineer...',
		timestamp: '4:00 PM',
		isRead: false,
		isStarred: true,
		labels: [labels.notify],
	},
	{
		id: 'e2',
		sender: 'Krysta Camburn',
		subject: 'Invitation from an unknown sender: Commure + Athelas',
		snippet:
			'Commure + Athelas Recruiter Phone Screen Confirmation - S... @ Fri Jul 18, 2025 4pm - 4:20pm (CDT)',
		timestamp: 'Jul 16',
		isRead: false,
		isStarred: false,
		labels: [labels.focus, labels.meeting],
	},
	{
		id: 'e3',
		sender: 'no-reply',
		subject: 'Thank you for your interest in Cross River',
		snippet:
			'Hi John, Thank you for your interest in the Senior Software Engineer - Data Platform role here at Cross River...',
		timestamp: 'Jul 16',
		isRead: true,
		isStarred: false,
		labels: [labels.notify, labels.denied],
	},
	{
		id: 'e4',
		sender: 'Lark Hiring Team',
		subject: 'Update from Lark Health',
		snippet:
			'Hi John, Thank you for your interest in the Senior Software Engineer, Mobile role with Lark. After careful review...',
		timestamp: 'Jul 16',
		isRead: true,
		isStarred: false,
		labels: [labels.notify, labels.denied],
	},
	{
		id: 'e5',
		sender: 'Newfront Hiring Team',
		subject: 'Thank you for your interest in Newfront, John',
		snippet:
			"Hi John, Thank you for the time and effort you've dedicated to applying for the Software Engineer...",
		timestamp: 'Jul 14',
		isRead: true,
		isStarred: false,
		labels: [labels.notify, labels.denied],
	},
	{
		id: 'e6',
		sender: 'xAI',
		subject: 'New login to your xAI account',
		snippet:
			"Your xAI account has been accessed from a new IP address. We've noticed a new login...",
		timestamp: 'Jul 10',
		isRead: true,
		isStarred: false,
		labels: [labels.notify],
	},
	{
		id: 'e9',
		sender: 'Arielle Cortese',
		subject: "Flock Safety | You're Confirmed!",
		snippet:
			'Hi John, I am looking forward to connecting soon! You can find the meeting link below...',
		timestamp: 'Jul 8',
		isRead: false,
		isStarred: true,
		labels: [labels.focus, labels.pdf],
	},
	{
		id: 'e10',
		sender: 'Arielle, me 2',
		subject: 'Flock Safety Interview Request',
		snippet:
			"Senior Fullstack Engineer, API - Hi Arielle, Thank you for reaching out. I've successfully scheduled...",
		timestamp: 'Jul 8',
		isRead: true,
		isStarred: false,
		labels: [labels.focus, labels['ask-schedule']],
	},
	{
		id: 'e12',
		sender: 'Ian Jutras',
		subject: 'Invitation from an unknown sender',
		snippet:
			'John Jackson and Ian Jutras @ Thu Jul 10, 2025 12:30pm - 1pm (CDT)...',
		timestamp: 'Jul 8',
		isRead: true,
		isStarred: false,
		labels: [labels.focus, labels.meeting],
	},
	{
		id: 'e13',
		sender: 'Flock Safety Hiring.',
		subject: 'Flock Safety | We received your application!',
		snippet:
			"Hi John, Thank you for applying to Flock Safety! We're confirming that we received your application...",
		timestamp: 'Jul 8',
		isRead: true,
		isStarred: false,
		labels: [labels.application],
	},
];

export const navLinks: NavLink[] = [
	{ id: 'nav1', text: 'Inbox', icon: FiInbox, isActive: true },
	{ id: 'nav2', text: 'Starred', icon: FiStar },
	{ id: 'nav3', text: 'Sent', icon: FiSend },
	{ id: 'nav4', text: 'Drafts', icon: FiFileText },
	{ id: 'nav5', text: 'Trash', icon: FiTrash2 },
	{ id: 'nav6', text: 'More', icon: FiChevronDown },
];

export const labelLinks: LabelLink[] = [
	{ id: 'll1', name: 'Application', color: 'var(--label-purple)' },
	{ id: 'll2', name: 'Focus', color: 'var(--brand-yellow)' },
	{ id: 'll3', name: 'Ask-Schedule', color: 'var(--label-cyan)' },
	{ id: 'll4', name: 'Meeting', color: 'var(--brand-blue)' },
	{ id: 'll5', name: 'Tech Test', color: 'var(--brand-red)' },
];
