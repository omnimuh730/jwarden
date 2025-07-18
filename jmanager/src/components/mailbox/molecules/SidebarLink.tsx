import React from 'react';
import type { NavLink } from '../../../types/mailbox';
import styles from './SidebarLink.module.css';

const SidebarLink: React.FC<NavLink> = ({ icon: Icon, text, isActive }) => {
	const linkClasses = `${styles.sidebarLink} ${isActive ? styles.active : ''}`;

	return (
		<a href='#' className={linkClasses}>
			<Icon className={styles.icon} />
			<span className={styles.text}>{text}</span>
		</a>
	);
};
export default SidebarLink;
