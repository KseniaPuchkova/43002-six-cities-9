import Header from '../header/header';
import OffersList from '../offers-list/offers-list';
import CitiesList from '../cities-list/cities-list';
import {useAppSelector} from '../../hooks/hooks';
import {getOffersByCity} from '../../utils';

function Main(): JSX.Element {
  const {activeCity} = useAppSelector(({APP}) => APP);
  const {offers} = useAppSelector(({DATA}) => DATA);
  const offersByCity = getOffersByCity(activeCity, offers);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={`page__main page__main--index${offersByCity.length === 0 ? 'page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList />
        <OffersList />
      </main>
    </div>
  );
}

export default Main;
