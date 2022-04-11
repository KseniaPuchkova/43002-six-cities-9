import {useRef, useState, useEffect, useCallback, MutableRefObject} from 'react';
import Map from '../map/map';
import EmptyOffersList from './empty-offers-list';
import SortList from '../sort-list/sort-list';
import PlacesList from '../places-list/places-list';
import {useAppSelector} from '../../hooks/hooks';
import {getActiveCity, getOffersByActiveCity, getSortedOffersByActiveCity} from '../../store/app-process/selectors';
import {Offer} from '../../types/offer';

function OffersList(): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  const offersByCity = useAppSelector(getOffersByActiveCity);
  const sortedOffers = useAppSelector(getSortedOffersByActiveCity);

  const [hoveredOffer, setHoveredOffer] = useState<Offer | null>(null);
  const onMouseLeave = useCallback(() => setHoveredOffer(null), []);

  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref && ref.current){
      (ref as MutableRefObject<HTMLElement>).current.scrollIntoView({behavior: 'smooth'});
    }
  }, [activeCity]);

  return (
    <div className="cities">
      {offersByCity.length !== 0 ? (
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b
              className="places__found"
              ref={ref}
            >
              {offersByCity.length} {offersByCity.length === 1 ? 'place' : 'places'} to stay in {activeCity}
            </b>
            <SortList />
            <PlacesList
              offers={sortedOffers}
              onMouseEnter={setHoveredOffer}
              onMouseLeave={onMouseLeave}
            />
          </section>
          <div className="cities__right-section">
            <section className="cities__map map">
              <Map
                activeCity={offersByCity[0].city}
                offersByCity={offersByCity}
                hoveredOffer={hoveredOffer}
              />
            </section>
          </div>
        </div>
      ) : (
        <EmptyOffersList/>
      )}
    </div>
  );
}

export default OffersList;
