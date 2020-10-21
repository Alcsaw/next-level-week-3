import React from 'react';

import mapMarkerImg from '../images/map-marker.svg';
import logoVertical from '../images/logo-vertical.svg';

import '../styles/components/auth-sidebar.css';

const AuthSidebar: React.FC = () => {
  return (
    <aside className="auth-sidebar">

      <img src={logoVertical} alt="Happy" />

      <h2>
        <span className="city">Lajeado</span><br />
        Rio Grande do Sul
      </h2>

    </aside>
  );
}

export default AuthSidebar;