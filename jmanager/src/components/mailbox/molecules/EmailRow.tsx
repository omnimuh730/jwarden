import React from 'react';
import type { Email } from '../../../types/mailbox';
import Badge from '../atoms/Badge';
import { FiStar } from 'react-icons/fi';
import { GoStarFill } from 'react-icons/go';
import styles from './EmailRow.module.css';

interface EmailRowProps {
	email: Email;
}

const EmailRow: React.FC<EmailRowProps> = ({ email }) => {
	const rowClasses = `${styles.emailRow} ${!email.isRead ? styles.unread : ''}`;

	return (
		<div className={rowClasses}>
			<div className={styles.leftSection}>
				<input type='checkbox' className={styles.checkbox} />
				<button className={styles.starButton}>
					{email.isStarred ? (
						<GoStarFill className={styles.starIconFilled} />
					) : (
						<FiStar className={styles.starIcon} />
					)}
				</button>
				<span className={styles.sender}>{email.sender}</span>
			</div>

			<div className={styles.middleSection}>
				<div className={styles.labels}>
					{email.labels.map(label => (
						<Badge key={label.id} label={label} />
					))}
				</div>
				<span className={styles.subject}>{email.subject}</span>
				<span className={styles.snippet}>- {email.snippet}</span>
			</div>

			<div className={styles.rightSection}>{email.timestamp}</div>
		</div>
	);
};
export default EmailRow;
