import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Header from '../header/header';
import NotFound from '../not-found/not-found';
import Map from '../map/map';
import PlacesList from '../places-list/places-list';
import ReviewsList from '../reviews-list/reviews-list';
import ReviewForm from '../review-form/review-form';
import LoadingScreen from '../loading-screen/loading-screen';
import FavoritesButton from '../favorites-button/favorites-button';
import {useAppDispatch, useAppSelector} from '../../hooks/hooks';
import {loadReviewsByOfferAction, loadOfferAction, loadOffersNearbyAction} from '../../store/api-actions';
import {getRatingInPercent, makeFirstLetterUppercase} from '../../utils';
import {AuthorizationStatus, FavoriteButtonType} from '../../const';

const MAX_IMAGES_COUNT = 6;

function Room(): JSX.Element {
  const dispatch = useAppDispatch();

  const params = useParams();
  const id = Number(params.id);

  const {offers, currentOffer, offersNearby, reviewsByOffer} = useAppSelector(({DATA}) => DATA);
  const {authorizationStatus} = useAppSelector(({USER}) => USER);
  const offer = offers.find((item) => item.id === id);


  useEffect(() => {
    dispatch(loadOfferAction(id));
    dispatch(loadReviewsByOfferAction(id));
    dispatch(loadOffersNearbyAction(id));
  }, [dispatch, id]);


  if (!offer || !id) {
    return <NotFound />;
  }

  if (!currentOffer) {
    return <LoadingScreen />;
  }

  const {price, isPremium, host, title, rating, type, bedrooms, maxAdults, goods, description, city, images} = offer;
  const {isPro, name, avatarUrl} = host;

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0, MAX_IMAGES_COUNT).map((image: string) => (
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
              {isPremium
                && <div className="property__mark"><span>Premium</span></div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <FavoritesButton
                  favoriteButtonType={FavoriteButtonType.ROOM}
                  offer={offer}
                />
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
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsByOffer.length}</span></h2>
                <ReviewsList reviews={reviewsByOffer} />
                {authorizationStatus === AuthorizationStatus.Auth ? <ReviewForm /> : ''}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              activeCity={city}
              offersByCity={[...offersNearby, currentOffer]}
              hoveredOffer={currentOffer}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <PlacesList
              offers={offersNearby}
              isNearPlacesList
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Room;
