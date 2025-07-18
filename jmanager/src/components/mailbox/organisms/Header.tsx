import React from 'react';
import { FiMenu, FiHelpCircle, FiSettings } from 'react-icons/fi';
import { CgMenuGridO } from 'react-icons/cg';
import IconButton from '../atoms/IconButton';
import Logo from '../atoms/Logos';
import SearchBar from '../molecules/SearchBar';
import styles from './Header.module.css';

const Header: React.FC = () => (
	<header className={styles.header}>
		<div className={styles.left}>
			<IconButton Icon={FiMenu} />
			<Logo />
		</div>
		<SearchBar />
		<div className={styles.right}>
			<IconButton Icon={FiHelpCircle} />
			<IconButton Icon={FiSettings} />
			<IconButton Icon={CgMenuGridO} />
			<button className={styles.profileButton}>J</button>
		</div>
	</header>
);
export default Header;
