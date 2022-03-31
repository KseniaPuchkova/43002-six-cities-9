import Header from '../header/header';
import LoadingScreen from '../loading-screen/loading-screen';
import OffersList from '../offers-list/offers-list';
import CitiesList from '../cities-list/cities-list';
import {useAppSelector} from '../../hooks/hooks';
import {getOffersByCity} from '../../utils';
import {AuthorizationStatus} from '../../const';

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

function Main(): JSX.Element {
  const authorizationStatus = useAppSelector(({USER}) => USER.authorizationStatus);
  const isDataLoaded = useAppSelector(({DATA})=> DATA.isDataLoaded);
  const offers = useAppSelector(({DATA})=> DATA.offers);
  const activeCity = useAppSelector(({APP}) => APP.activeCity);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

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
