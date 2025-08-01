import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import App from './App.tsx';

const rootElement = document.querySelector('#root');
if (rootElement !== null) {
	createRoot(rootElement).render(
		<StrictMode>
			<App />
		</StrictMode>
	);
} else {
	throw new Error('Root element not found');
}
