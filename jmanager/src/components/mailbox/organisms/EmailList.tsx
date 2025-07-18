import React from 'react';
import {
	FiRefreshCw,
	FiMoreVertical,
	FiChevronLeft,
	FiChevronRight,
} from 'react-icons/fi';
import type { Email } from '../../../types/mailbox';
import EmailRow from '../molecules/EmailRow';
import IconButton from '../atoms/IconButton';
import styles from './EmailList.module.css';

interface EmailListProps {
	emails: Email[];
}

const EmailList: React.FC<EmailListProps> = ({ emails }) => (
	<main className={styles.emailList}>
		<div className={styles.toolbar}>
			<div className={styles.toolbarLeft}>
				<input type='checkbox' />
				<IconButton Icon={FiRefreshCw} />
				<IconButton Icon={FiMoreVertical} />
			</div>
			<div className={styles.toolbarRight}>
				<span>1-10 of {emails.length}</span>
				<IconButton Icon={FiChevronLeft} />
				<IconButton Icon={FiChevronRight} />
			</div>
		</div>
		<div className={styles.emailsContainer}>
			{emails.map(email => (
				<EmailRow key={email.id} email={email} />
			))}
		</div>
	</main>
);
export default EmailList;
