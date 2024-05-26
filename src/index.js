import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import {store} from './redux/Store';
import { persistor } from './redux/Store';
import { PersistGate } from 'redux-persist/integration/react';

import {Spinner} from "./component/Spinner"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter> 
    <Provider store={store}>
    {/* The loading prop can be any component you want to display
     while the application is loading the persisted state. */}
        <PersistGate loading={<div>It is loading</div>} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

