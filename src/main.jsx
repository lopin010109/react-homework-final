import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/all.scss';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/index.js';
import Loading from './components/Loading';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Loading type={'oval'} />
      <App />
    </Provider>
  </StrictMode>,
);
