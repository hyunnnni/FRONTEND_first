import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import Footer from './layout/Footer';
import Header from './layout/Header';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Header/>
      <App/>
      <Footer/>
    </BrowserRouter>
);
