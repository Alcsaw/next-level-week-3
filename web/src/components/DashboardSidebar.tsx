import React from 'react';
import { FiMapPin, FiAlertCircle, FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebar.css';

interface DashboardSidebarProps {
  currentPage: number;
  hasNotifications: boolean;
}

const Sidebar: React.FC<DashboardSidebarProps> = ({ currentPage, hasNotifications }) => {
  const { goBack } = useHistory();

  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <div className="middle">
        <button
          className={currentPage === 0 ? 'active-button' : ''}
          type="button"
          onClick={goBack}
        >
          <FiMapPin size={24} color="#0089A5" />
        </button>

        <button
          id="notifications-button"
          className={currentPage === 1 ? 'active-button' : ''}
          type="button"
          onClick={goBack}
        >
          <FiAlertCircle size={24} color="#FFF" />
          {hasNotifications &&
            <span className="notification-badge"></span>}
        </button>
      </div>

      <footer>
        <button type="button" onClick={goBack}>
          <FiPower size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}

export default Sidebar;
