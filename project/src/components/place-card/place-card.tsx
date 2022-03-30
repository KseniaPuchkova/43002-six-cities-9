import {memo} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import FavoritesButton from '../favorites-button/favorites-button';
import {getRatingInPercent, makeFirstLetterUppercase} from '../../utils';
import {AppRoute, FavoriteButtonType} from '../../const';
import {Offer} from '../../types/offer';
import {CardType} from '../../types/card';

type PlaceCardProps = {
  offer: Offer,
  cardType: CardType,
  onMouseEnter?: (offer: Offer) => void
  onMouseLeave?: () => void
}

function PlaceCard({offer, cardType, onMouseEnter, onMouseLeave}: PlaceCardProps): JSX.Element {
  const {isPremium, previewImage, price, rating, title, type, id} = offer;
  const {articleClassName, imgWrapperClassName, cardInfoClassName, imgWidth, imgHeight} = cardType;

  const handleOnMouseEnter = () => {
    if (onMouseEnter) {
      onMouseEnter(offer);
    }
  };
  const handleOnMouseLeave = onMouseLeave;

  return (
    <article
      className={classNames(articleClassName, 'place-card')}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      {isPremium &&
        <div className="place-card__mark"><span>Premium</span>
        </div>}
      <div className={classNames(imgWrapperClassName, 'place-card__image-wrapper')}>
        <Link to={`${AppRoute.Offer}${id}`}>
          <img
            className="place-card__image"
            src={classNames(previewImage)}
            width={classNames(imgWidth)}
            height={classNames(imgHeight)}
            alt={`Place ${id}`}
            onClick={() => window.scrollTo(0, 0)}
          />
        </Link>
      </div>
      <div className={classNames(cardInfoClassName, 'place-card__info')}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoritesButton
            favoriteButtonType={FavoriteButtonType.CARD}
            offer={offer}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingInPercent(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}${id}`} onClick={() => window.scrollTo(0, 0)}>{title}</Link>
        </h2>
        <p className="place-card__type">{makeFirstLetterUppercase(type)}</p>
      </div>
    </article>
  );
}
export default memo(PlaceCard);
