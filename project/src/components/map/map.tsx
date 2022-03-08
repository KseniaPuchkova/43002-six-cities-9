import {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {City, Offer} from '../../types/offer';
import useMap from '../../hooks/use-map';

type MapProps = {
  city: City,
  offers: Offer[],
  hoveredOffer: Offer | null,
};

const defaultIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [30, 40],
  iconAnchor: [15, 30],
});

const activeIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [30, 40],
  iconAnchor: [15, 30],
});

const getIcon = (hoveredOffer: Offer | null, offer: Offer) => {
  if (hoveredOffer) {
    if (hoveredOffer.id === offer.id) {
      return activeIcon;
    }
  }
  return defaultIcon;
};

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
              icon: getIcon(hoveredOffer, offer),
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
