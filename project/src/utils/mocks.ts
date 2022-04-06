import {address, datatype, image, internet, lorem, name} from 'faker';
import {getRandomArrayItem} from '../utils/utils';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {Offer} from '../types/offer';
import {Review} from '../types/review';
import {CardType} from '../types/card';
import {FavoriteButtonType} from '../types/favorite-button';

export const ONE_ACTION = 'UNKNOWN_ACTION';
export const OFFERS_COUNT = 100;
export const FAVORITES_COUNT = 10;
export const REVIEWS_COUNT = 5;
export const OFFERS_TYPES = ['Apartment', 'Hotel', 'House', 'PrivateRoom'];
export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export const fakeCity: string = getRandomArrayItem(CITIES);

export const makeFakeOffer = (id: number) => {
  const offer: Offer = {
    bedrooms: datatype.number(5),
    city: {
      name: fakeCity,
      location: {
        latitude: parseFloat(address.latitude()),
        longitude: parseFloat(address.longitude()),
        zoom: 10,
      },
    },
    description: lorem.sentences(2),
    goods: [],
    host: {
      id: 1,
      isPro: datatype.boolean(),
      name: name.firstName(),
      avatarUrl: image.avatar(),
    },
    id,
    images: [],
    isFavorite: datatype.boolean(),
    isPremium: datatype.boolean(),
    location: {
      latitude: parseFloat(address.latitude()),
      longitude: parseFloat(address.longitude()),
      zoom: 10,
    },
    maxAdults: datatype.number(5),
    previewImage: image.imageUrl(),
    price: datatype.number(100),
    rating: datatype.number(5),
    title: lorem.sentence(1),
    type: getRandomArrayItem(OFFERS_TYPES),
  };

  return offer;
};

export const makeFakeReviewByOffer = (id: number) => {
  const review: Review = {
    id,
    comment: lorem.sentences(3),
    rating: datatype.number(5),
    date: datatype.datetime().toString(),
    user: {
      id: 1,
      isPro: datatype.boolean(),
      name: name.firstName(),
      avatarUrl: image.imageUrl(),
    },
  };

  return review;
};

export const fakeAuthData: AuthData = {
  email: internet.email(),
  password: internet.password(),
};

export const fakeUserData: UserData = {
  avatarUrl: image.avatar(),
  email: internet.email(),
  id: 1,
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.string(5),
};

export const fakeCardType: CardType = {
  articleClassName: 'near-places__card',
  imgWrapperClassName: 'near-places__image-wrapper',
  cardInfoClassName: '',
  imgWidth: '260',
  imgHeight: '200',
};

export const fakeFavoriteButtonType: FavoriteButtonType = {
  buttonClassName: 'place-card',
  imgWidth: '18',
  imgHeight: '19',
};

export const makeFakeOffers = (): Offer[] =>
  new Array(OFFERS_COUNT).fill(null).map((_offer, index) => makeFakeOffer(index));

export const makeFakeReviewsByOffer = (): Review[] =>
  new Array(REVIEWS_COUNT).fill(null).map((_review,  index) => makeFakeReviewByOffer(index));

