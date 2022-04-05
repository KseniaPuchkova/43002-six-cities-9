import {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import {City, Offer} from '../../types/offer';

export enum MarkerUrl {
  Default = 'img/pin.svg',
  Active = 'img/pin-active.svg'
}

type MapProps = {
  activeCity: City,
  offersByCity: Offer[],
  hoveredOffer: Offer | null,
};

const defaultIcon = leaflet.icon({
  iconUrl: MarkerUrl.Default,
  iconSize: [30, 40],
  iconAnchor: [15, 30],
});

const activeIcon = leaflet.icon({
  iconUrl: MarkerUrl.Active,
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

      map.scrollWheelZoom.disable();
    }

    return () => {
      if (map) {
        layerGroup.remove();
      }
    };
  }, [map, activeCity, offersByCity, hoveredOffer]);

  return (
    <div id="map" style={{height: '100%'}} ref={mapRef} data-testid="Map"></div>
  );
}

export default Map;
