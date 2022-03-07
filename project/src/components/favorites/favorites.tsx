import {Offer} from '../../types/offer';
import Header from '../header/header';
import Footer from '../footer/footer';
import EmptyFavorites from './empty-favorites';
import FavoritesList from '../favorites-list/favorites-list';

type FavoritesProps = {
  offers: Offer[],
};

function Favorites({offers}: FavoritesProps): JSX.Element {
  const favorites = offers.filter(({isFavorite}) => isFavorite);

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
