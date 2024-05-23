import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
<<<<<<< HEAD
import { store } from './components/redux/store';
import { Provider } from 'react-redux';
=======
import { Provider } from 'react-redux';
import { store } from './redux/store';
>>>>>>> 34667019b97ad9fcd72b12038480b4b4582ab1e5

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <Provider store={store}>
    <App />
  </Provider>
);


