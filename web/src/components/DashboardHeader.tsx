import React from 'react';

import '../styles/components/dashboard-header.css';

const DashboardHeader: React.FC = () => {
  return (
    <header className="dashboard-header">
      <h2>Orfanatos Cadastrados</h2>
      <p>2 orfanatos</p>
    </header>
  );
}

export default DashboardHeader;
