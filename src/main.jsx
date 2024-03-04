/* eslint-disable import/no-extraneous-dependencies */
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { MusicContextProvider } from './context/MusicContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <MusicContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </MusicContextProvider>,
);
