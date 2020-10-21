import React from 'react';

import { AuthProvider } from './contexts/auth';
import Routes from './routes';

import './styles/global.css';
import 'leaflet/dist/leaflet.css';


function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
