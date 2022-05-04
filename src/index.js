import React from 'react';
import ReactDOM from 'react-dom/client';
import store from 'store';

import './index.scss';
import App from './components/app/app';

store.clearAll();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
