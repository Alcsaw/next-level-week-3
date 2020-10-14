import Leaflet from 'leaflet';

import mapMarkerImg from '../images/map-marker.svg';

const happyMapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2]
});
// inconAnchor is defined to set the anchor in the middle of X axis and
// the end of Y axis so the icon is "pointing" to the address correctly

export default happyMapIcon;
