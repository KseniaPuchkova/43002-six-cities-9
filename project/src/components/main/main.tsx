import {useState} from 'react';
import {Offer} from '../../types/offer';
import {getOffersByCity, getSortedOffersByCity} from '../../utils';
import {useAppSelector} from '../../hooks/index';
import Map from '../map/map';
import EmptyMain from './empty-main';
import Header from '../header/header';
import SortList from '../sort-list/sort-list';
import PlacesList from '../places-list/places-list';
import CitiesList from '../cities-list/cities-list';

type MainProps = {
  offers: Offer[]
};

function MainPage({offers}: MainProps): JSX.Element {
  const {activeCity, sortType} = useAppSelector((state) => state);
  const offersByCity = getOffersByCity(activeCity, offers);
  const sortedOffersByCity = getSortedOffersByCity(sortType, offersByCity);

  const [hoveredOffer, setHoveredOffer] = useState<Offer | null>(null);
  const handleOnMouseEnter = setHoveredOffer;
  const handleOnMouseLeave = () => setHoveredOffer(null);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index ${offersByCity.length === 0 && 'page__main--index-empty'}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          {offersByCity.length !== 0 ? (
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersByCity.length} {offersByCity.length === 1 ? 'place' : 'places'} to stay in {activeCity}</b>
                <SortList />
                <PlacesList
                  offers={sortedOffersByCity}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map
                    city={offersByCity[0].city}
                    offersByCity={offersByCity}
                    hoveredOffer={hoveredOffer}
                  />
                </section>
              </div>
            </div>
          ) : (
            <EmptyMain />
          )}
        </div>
      </main>
    </div>
  );
}

export default MainPage;
