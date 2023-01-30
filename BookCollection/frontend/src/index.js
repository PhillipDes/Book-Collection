import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

//import context providers
import { BooksContextProvider } from './context/BooksContext';
import { AuthContextProvider } from './context/AuthContext';
import { CreateModalContextProvider } from './context/CreateModalContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BooksContextProvider>
        <CreateModalContextProvider>
          <App />
        </CreateModalContextProvider>
      </BooksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

