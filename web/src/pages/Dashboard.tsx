import React, { useEffect, useState } from 'react';
import { Map, Marker, TileLayer } from "react-leaflet";

import DashboardSidebar from '../components/DashboardSidebar';
import Loading from '../components/Loading';
import happyMapIcon from '../utils/mapIcon';
import api from '../services/api';

import '../styles/pages/dashboard.css';
import DashboardHeader from '../components/DashboardHeader';

interface Orphanage {
  id: number;
  name: string;
  about: string;
  instructions: string;
  latitude: number;
  longitude: number;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
};

const Dashboard: React.FC = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>();

  useEffect(() => {
    api.get('orphanages/').then(response => {
      setOrphanages(response.data);
    });
  }, []);

  if (!orphanages) {
    return <Loading />;
  }


  return (
    <div className="dashboard">
      <DashboardSidebar currentPage={0} hasNotifications={true} />


      <main>
        <DashboardHeader />
        <div className="orphanage-list">
          {orphanages.map(orphanage => (
            <div
              className="map-container"
              key={orphanage.id}
            >
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>
              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  {orphanage.name}
                </a>
              </footer>
            </div>
          ))}


        </div>
      </main>
    </div>
  );
}

export default Dashboard;
