import {Link} from 'react-router-dom';
import FavoritesButton from '../favorites-button/favorites-button';
import {getRatingInPercent, makeFirstLetterUppercase} from '../../utils';
import {FavoriteButtonType} from '../../const';
import {Offer} from '../../types/offer';
import {Card} from '../../types/card';

type PlaceCardProps = {
  offer: Offer,
  cardType: Card,
  onMouseEnter?: (offer: Offer) => void
  onMouseLeave?: () => void
}

function PlaceCard({offer, cardType, onMouseEnter, onMouseLeave}: PlaceCardProps): JSX.Element {
  const {isPremium, previewImage, price, rating, title, type, id} = offer;
  const {articleClassName, imgWrapperClassName, cardInfoClassName, imgWidth, imgHeight} = cardType;

  const handleOnMouseLeave = onMouseLeave;
  const handleOnMouseEnter  = () => {
    if (onMouseEnter) {
      onMouseEnter(offer);
    }
  };

  return (
    <article
      className={`${articleClassName} place-card`}
      onMouseEnter={handleOnMouseEnter}
      onMouseLeave={handleOnMouseLeave}
    >
      {isPremium &&
        <div className="place-card__mark"><span>Premium</span>
        </div>}
      <div className={`${imgWrapperClassName} place-card__image-wrapper`}>
        <Link to={`/offer/${id}`}>
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
      <div className={`${cardInfoClassName} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <FavoritesButton
            favoriteButton={FavoriteButtonType.CARD}
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
          <Link to={`/offer/${id}`} onClick={() => window.scrollTo(0, 0)}>{title}</Link>
        </h2>
        <p className="place-card__type">{makeFirstLetterUppercase(type)}</p>
      </div>
    </article>
  );
}
export default PlaceCard;
