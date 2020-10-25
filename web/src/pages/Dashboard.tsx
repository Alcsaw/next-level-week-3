import React from 'react';

// import { Container } from './styles';

import DashboardSidebar from '../components/DashboardSidebar';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <DashboardSidebar currentPage={0} hasNotifications={true} />
      <h2>Orfanatos Cadastrados</h2>
    </div>
  );
}

export default Dashboard;