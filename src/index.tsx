import React from 'react';
import { App } from './App';
import { createRoot } from 'react-dom/client';
// Uncomment the line below to include the styling
import './index.css';

import { Provider } from 'react-redux';
import { store } from 'redux/store';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
