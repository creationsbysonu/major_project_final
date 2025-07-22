import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CartProvider } from './lib/CartContext.tsx';
import './index.css';

const clientId = '538678366639-vcangl1sh7il69158hnvesoc2u6kjeee.apps.googleusercontent.com'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <CartProvider>
      <App />
    </CartProvider>
  </GoogleOAuthProvider>
);
