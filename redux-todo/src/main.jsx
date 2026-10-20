import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store.js';
import App from './App.jsx';
import './style.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provider 아래의 컴포넌트는 모두 이 store에 접근합니다. */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
