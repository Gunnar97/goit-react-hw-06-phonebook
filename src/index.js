import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { ToastContainer } from 'react-toastify';

import { App } from 'App';
import { store } from 'redux/store';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Provider store={store}>
      <App />
      <ToastContainer autoClose={1500} />
    </Provider>
  </>
);
