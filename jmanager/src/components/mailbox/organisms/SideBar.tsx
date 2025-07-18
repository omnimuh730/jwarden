import React from 'react';
import { FiEdit, FiPlus } from 'react-icons/fi';
import SidebarLink from '../molecules/SidebarLink';
import { navLinks, labelLinks } from '../../../data/mailbox/mockData';
import IconButton from '../atoms/IconButton';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => {
	return (
		<aside className={styles.sidebar}>
			<div className={styles.composeContainer}>
				<button className={styles.composeButton}>
					<FiEdit />
					<span>Compose</span>
				</button>
			</div>
			<nav>
				{navLinks.map(link => (
					<SidebarLink key={link.id} {...link} />
				))}
			</nav>
			<div className={styles.labelsSection}>
				<div className={styles.labelsHeader}>
					<h3>Labels</h3>
					<IconButton Icon={FiPlus} />
				</div>
				{labelLinks.map(label => (
					<a href='#' key={label.id} className={styles.labelLink}>
						<div
							className={styles.labelColorDot}
							style={{ backgroundColor: label.color }}
						></div>
						<span>{label.name}</span>
					</a>
				))}
			</div>
		</aside>
	);
};
export default Sidebar;
