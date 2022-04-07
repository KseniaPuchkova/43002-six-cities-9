import {MAX_RATING} from '../components/review-item/review-item';
import {SortType} from '../const';
import {Offer} from '../types/offer';

export const getRatingInPercent = (rating: number): number => Math.round(rating) * 100 / MAX_RATING;

export const makeFirstLetterUppercase = (str: string): string => str[0].toUpperCase() + str.slice(1);

export const getOffersByCity = (currentCity: string, offers: Offer[]): Offer[] => {
  const offersByCity = offers.filter(({city}) => currentCity === city.name);

  return offersByCity;
};

export const getSortedOffers = (sortType: string, offers: Offer[]): Offer[] => {
  let sortedOffers: Offer[] = [];

  switch (sortType) {
    case SortType.POPULAR:
      sortedOffers = offers;
      break;
    case SortType.LOW_PRICE_FIRST:
      sortedOffers = offers.slice().sort((a: Offer, b: Offer) => a.price - b.price);
      break;
    case SortType.HIGH_PRICE_FIRST:
      sortedOffers = offers.slice().sort((a: Offer, b: Offer) => b.price - a.price);
      break;
    case SortType.TOP_RATED_FIRST:
      sortedOffers = offers.slice().sort((a: Offer, b: Offer) => b.rating - a.rating);
      break;
    default:
      throw new Error('The sorting type is unknown');
  }

  return sortedOffers;
};

export function sortCities(a: Offer, b: Offer): number {
  if (a.city.name < b.city.name) {
    return -1;
  }
  if (a.city.name > b.city.name) {
    return 1;
  }

  return 0;
}

export const getRandomIntegerNumber = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayItem = (array: string[]): string => {
  const randomIndex = getRandomIntegerNumber(0, array.length - 1);

  return array[randomIndex];
};
