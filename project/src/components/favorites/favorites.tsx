import Header from '../header/header';
import Footer from '../footer/footer';
import EmptyFavorites from './empty-favorites';
import FavoritesList from '../favorites-list/favorites-list';
import {useAppSelector} from '../../hooks/hooks';
import {getSortedFavorites} from '../../store/data-process/selectors';

function Favorites(): JSX.Element {
  const favorites = useAppSelector(getSortedFavorites);

  if (favorites.length) {
    return (
      <div className="page">
        <Header />
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoritesList favorites={favorites} />
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  } else {
    return (
      <EmptyFavorites />
    );
  }
}

export default Favorites;
