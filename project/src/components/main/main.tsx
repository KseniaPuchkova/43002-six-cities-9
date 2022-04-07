import className from 'classnames';
import Header from '../header/header';
import OffersList from '../offers-list/offers-list';
import CitiesList from '../cities-list/cities-list';
import {useAppSelector} from '../../hooks/hooks';
import {getOffersByActiveCity} from '../../store/app-process/selectors';
import {AuthorizationStatus} from '../../const';

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

function Main(): JSX.Element {
  const offersByCity = useAppSelector(getOffersByActiveCity);

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={className('page__main page__main--index', {'page__main--index-empty' : offersByCity.length === 0})}>
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList />
        <OffersList />
      </main>
    </div>
  );
}

export default Main;
