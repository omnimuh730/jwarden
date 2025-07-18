import React from 'react';
import Header from '../../components/mailbox/organisms/Header';
import Sidebar from '../../components/mailbox/organisms/SideBar';
import EmailList from '../../components/mailbox/organisms/EmailList';
import { mockEmails } from './../../data/mailbox/mockData';
import styles from './MailBox.module.css';

const App: React.FC = () => {
	return (
		<div className={styles.app}>
			<Header />
			<div className={styles.main}>
				<Sidebar />
				<div className={styles.content}>
					<EmailList emails={mockEmails} />
				</div>
			</div>
		</div>
	);
};
export default App;
