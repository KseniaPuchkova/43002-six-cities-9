import {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {City, Offer} from '../../types/offer';
import useMap from '../../hooks/use-map';

const URL_MARKER_DEFAULT = 'img/pin.svg';
const URL_MARKER_ACTIVE = 'img/pin-active.svg';

type MapProps = {
  activeCity: City,
  offersByCity: Offer[],
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

function Map({activeCity, offersByCity, hoveredOffer}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, activeCity);

  useEffect(() => {
    const layerGroup = leaflet.layerGroup();

    if (map) {
      offersByCity.forEach((offer) => {
        const marker = leaflet.marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {
            icon: (offer === hoveredOffer && offer !== null) ? activeIcon : defaultIcon,
          },
        );
        layerGroup.addLayer(marker);
      });

      layerGroup.addTo(map);

      map.flyTo(
        [offersByCity[0].city.location.latitude, offersByCity[0].city.location.longitude],
        offersByCity[0].city.location.zoom,
        {
          animate: false,
          duration: 1.5,
        },
      );
    }

    return () => {
      if (map) {
        layerGroup.remove();
      }
    };
  }, [map, activeCity, offersByCity, hoveredOffer]);

  return (
    <div id="map" style={{height: '100%'}} ref={mapRef}></div>
  );
}

export default Map;
