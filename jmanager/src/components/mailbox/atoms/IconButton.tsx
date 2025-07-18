import React from 'react';
import styles from './IconButton.module.css';

interface IconButtonProps {
	Icon: React.ElementType;
	onClick?: () => void;
	className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
	Icon,
	onClick,
	className = '',
}) => {
	return (
		<button
			onClick={onClick}
			className={`${styles.iconButton} ${className}`}
		>
			<Icon className={styles.icon} />
		</button>
	);
};
export default IconButton;
