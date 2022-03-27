import {useState, useCallback} from 'react';
import Map from '../map/map';
import EmptyOffersList from './empty-offers-list';
import SortList from '../sort-list/sort-list';
import PlacesList from '../places-list/places-list';
import {useAppSelector} from '../../hooks/index';
import {getOffersByCity, getSortedOffers} from '../../utils';
import {Offer} from '../../types/offer';

function OffersList(): JSX.Element {
  const {activeCity, offers, sortType} = useAppSelector((state) => state);
  const offersByCity = getOffersByCity(activeCity, offers);
  const sortedOffers = getSortedOffers(sortType, offersByCity);

  const [hoveredOffer, setHoveredOffer] = useState<Offer | null>(null);
  const handleOnMouseEnter = setHoveredOffer;
  const handleOnMouseLeave = useCallback(() => setHoveredOffer(null), []);

  return (
    <div className="cities">
      {offersByCity.length !== 0 ? (
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offersByCity.length} {offersByCity.length === 1 ? 'place' : 'places'} to stay in {activeCity}</b>
            <SortList />
            <PlacesList
              offers={sortedOffers}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
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
