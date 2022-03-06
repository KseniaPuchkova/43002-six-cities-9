import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';

import {getRatingInPercent, makeFirstLetterUppercase} from '../../utils';

type PlaceCardProps = {
  offer: Offer,
  cardType: {
    articleClassName: string;
    imgWrapperClassName: string,
    cardInfoClassName: string,
    imgWidth: string,
    imgHeight: string
  },
  onMouseOver?: (offer: Offer) => void
}

function PlaceCard({offer, cardType, onMouseOver}: PlaceCardProps): JSX.Element {
  const {isPremium, isFavorite, previewImage, price, rating, title, type, id} = offer;
  const {articleClassName, imgWrapperClassName, cardInfoClassName, imgWidth, imgHeight} = cardType;

  return (
    <article
      className={`${articleClassName} place-card`}
      onMouseOver={() => {
        if (onMouseOver) {
          onMouseOver(offer);
        }
      }}
    >
      {isPremium &&<div className="place-card__mark"><span>Premium</span></div>}
      <div className={`${imgWrapperClassName} place-card__image-wrapper`}>
      <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imgWidth}
            height={imgHeight}
            alt={`Place ${id}`}
          />
        </Link>
      </div>
      <div className={`${cardInfoClassName} place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button ${isFavorite && 'place-card__bookmark-button--active'} button`}
            type="button"
          >
            <svg
              className="place-card__bookmark-icon"
              width="18"
              height="19"
            >
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: getRatingInPercent(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{makeFirstLetterUppercase(type)}</p>
      </div>
    </article>
  );
}
export default PlaceCard;
