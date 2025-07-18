import React from 'react';
import type { Label } from '../../../types/mailbox';
import styles from './Badge.module.css';

interface BadgeProps {
	label: Label;
}

const Badge: React.FC<BadgeProps> = ({ label }) => {
	return (
		<span className={styles.badge} style={{ backgroundColor: label.color }}>
			{label.name}
		</span>
	);
};
export default Badge;
