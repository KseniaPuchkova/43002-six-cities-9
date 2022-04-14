import {memo} from 'react';
import {Link} from 'react-router-dom';
import className from 'classnames';
import FavoritesButton from '../favorites-button/favorites-button';
import {getRatingInPercent, makeFirstLetterUppercase} from '../../utils/utils';
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

  const routeToOffer = `${AppRoute.Offer}${id}`;

  return (
    <article
      className={className(articleClassName, 'place-card')}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={onMouseLeave}
      data-testid="place-card"
    >
      {isPremium &&
        <div className="place-card__mark"><span>Premium</span>
        </div>}
      <div className={className(imgWrapperClassName, 'place-card__image-wrapper')}>
        <Link to={routeToOffer}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imgWidth}
            height={imgHeight}
            alt={`Place ${id}`}
            onClick={() => window.scrollTo(0, 0)}
          />
        </Link>
      </div>
      <div className={className(cardInfoClassName, 'place-card__info')}>
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
            <span style={{width: `${getRatingInPercent(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={routeToOffer} onClick={() => window.scrollTo(0, 0)}>{title}</Link>
        </h2>
        <p className="place-card__type">{makeFirstLetterUppercase(type)}</p>
      </div>
    </article>
  );
}
export default memo(PlaceCard, (prevProps, nextProps) => prevProps.offer === nextProps.offer);
