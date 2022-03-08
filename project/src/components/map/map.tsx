import {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {City, Offer} from '../../types/offer';
import useMap from '../../hooks/use-map';

const URL_MARKER_DEFAULT = 'img/pin.svg';
const URL_MARKER_ACTIVE = 'img/pin-active.svg';

type MapProps = {
  city: City,
  offers: Offer[],
  hoveredOffer: Offer | null,
};

const defaultIcon = leaflet.icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [30, 40],
  iconAnchor: [15, 30],
});

const activeIcon = leaflet.icon({
  iconUrl: URL_MARKER_ACTIVE,
  iconSize: [30, 40],
  iconAnchor: [15, 30],
});

function Map({city, offers, hoveredOffer}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker(
            {
              lat: offer.location.latitude,
              lng: offer.location.longitude,
            },
            {
              icon: (hoveredOffer !== undefined && hoveredOffer === offer) ? activeIcon : defaultIcon,
            },
          )
          .addTo(map);
      });
    }
  }, [map, offers, hoveredOffer]);

  return (
    <div id="map" style={{height: '100%'}} ref={mapRef}></div>
  );
}

export default Map;
