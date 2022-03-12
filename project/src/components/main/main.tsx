import {useState} from 'react';
import {Offer} from '../../types/offer';
import {useAppSelector} from '../../hooks/index';
import Map from '../map/map';
import EmptyMain from './empty-main';
import Header from '../header/header';
import PlacesList from '../places-list/places-list';
import CitiesList from '../cities-list/cities-list';

function MainPage(): JSX.Element {
  const {activeCity, offersByCity} = useAppSelector((state) => state);

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
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by</span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select" />
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <PlacesList
                  offers={offersByCity}
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
