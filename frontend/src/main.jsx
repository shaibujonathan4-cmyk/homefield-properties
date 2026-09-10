import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { BookingProvider } from './context/BookingContext.jsx';
import { PropertyProvider } from './context/PropertyContext.jsx';
import { RequestProvider } from './context/RequestContext.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PropertyProvider>
        <BookingProvider>
          <RequestProvider>
            <App />
          </RequestProvider>
        </BookingProvider>
      </PropertyProvider>
    </AuthProvider>
  </React.StrictMode>
);