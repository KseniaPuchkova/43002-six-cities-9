import {Offer} from '../../types/offer';
import FavoritesCities from '../favorites-cities/favorites-cities';

type FavoritesListProps = {
  favorites: Offer[],
};

function FavoritesList({favorites}: FavoritesListProps): JSX.Element {
  const cities: string[] = [...new Set(favorites.map((favorite) => favorite.city.name))];

  return (
    <ul className="favorites__list">
      {cities.map((city) => (
        <FavoritesCities
          key={city}
          city={city}
          favorites={favorites}
        />
      ))}
    </ul>
  );
}

export default FavoritesList;
