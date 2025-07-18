import React from 'react';
import { FiSearch, FiSliders } from 'react-icons/fi';
import styles from './SearchBar.module.css';

const SearchBar: React.FC = () => (
	<div className={styles.searchWrapper}>
		<div className={styles.searchBar}>
			<FiSearch className={styles.searchIcon} />
			<input
				type='text'
				placeholder='Search mail'
				className={styles.searchInput}
			/>
			<FiSliders className={styles.sliderIcon} />
		</div>
	</div>
);
export default SearchBar;
