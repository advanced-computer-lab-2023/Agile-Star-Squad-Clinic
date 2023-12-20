import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';

import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { UserContextProvider } from './user-store/user-context';
import { ToastContainer } from 'react-toastify';

const firebaseConfig = {
    apiKey: "AIzaSyB_EEjUYhdGRri3Zi2rfSv0r98uPcXnyJg",
    authDomain: "clinic-e378c.firebaseapp.com",
    projectId: "clinic-e378c",
    storageBucket: "clinic-e378c.appspot.com",
    messagingSenderId: "1084549128738",
    appId: "1:1084549128738:web:10d353eda8ceccdd57e07b"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CookiesProvider>
    <UserContextProvider>
      <ToastContainer />
      <App />
    </UserContextProvider>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
