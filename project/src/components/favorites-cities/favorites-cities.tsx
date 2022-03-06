import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';
import PlaceCard from '../place-card/place-card';
import {AppRoute, CardTypes} from '../../const';

type FavoritesCitiesProp = {
  favorites: Offer[],
  city: string,
};

function FavoritesCities({favorites, city}: FavoritesCitiesProp): JSX.Element {
  const favoritesByCity = favorites.filter((offer) => offer.city.name === city);

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Main}>
            <span>{city}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        {favoritesByCity.map((offer) => (
          <PlaceCard
            key={offer.id}
            offer={offer}
            cardType={CardTypes['FAVORITES']}
          />
        ))}
      </div>
    </li>
  );
}

export default FavoritesCities;
