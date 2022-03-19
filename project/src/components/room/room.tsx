import {useParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks/index';
import {getRatingInPercent, makeFirstLetterUppercase} from '../../utils';
import {Review} from '../../types/review';
import Header from '../header/header';
import EmptyMain from '../main/empty-main';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';

const MAX_NEAR_OFFERS = 3;

type RoomProps = {
  reviews: Review[],
}

function Room({reviews}: RoomProps): JSX.Element {
  const {id} = useParams();

  const {offers} = useAppSelector((state) => state);

  const offer = offers.find((currentOffer: any) => currentOffer.id === Number(id));

  if (!offer) {
    return <EmptyMain />;
  }

  const {price, isPremium, isFavorite, host, title, rating, type, bedrooms, maxAdults, goods, description, images, city} = offer;
  const {isPro, name, avatarUrl} = host;

  const nearOffers = offers.filter((currentOffer: any) => currentOffer !== offer).slice(0, MAX_NEAR_OFFERS);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image: string) => (
                <div
                  key={image}
                  className="property__image-wrapper"
                >
                  <img className="property__image"
                    src={image}
                    alt={makeFirstLetterUppercase(type)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && <div className="property__mark"><span>Premium</span></div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <button
                  className={`property__bookmark-button ${isFavorite && 'property__bookmark-button--active'} button`}
                  type="button"
                >
                  <svg className="property__bookmark-icon" style={{width: '31', height: '33'}}>
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: getRatingInPercent(rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {makeFirstLetterUppercase(type)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${bedrooms} ${bedrooms > 1 ? 'bedrooms' : 'bedroom'}`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${maxAdults} ${maxAdults > 1 ? 'adults' : 'adult'}`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good: string) => (
                    <li
                      key={good}
                      className="property__inside-item"
                    >{good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={avatarUrl}
                      style={{width: '74', height: '74'}}
                      alt={`${name}-avatar`}
                    />
                  </div>
                  <span className="property__user-name">{name}</span>
                  {isPro && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList reviews={reviews} />
                <ReviewForm />
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map activeCity={city} offersByCity={nearOffers} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesList offers={nearOffers} isNearPlacesList />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Room;
