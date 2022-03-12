import {Offer} from './types/offer';
import {SortType} from './const';
import {MAX_RATING} from './components/review-item/review-item';

export const getRatingInPercent = (rating: number): string => `${rating * 100 / MAX_RATING}%`;

export const makeFirstLetterUppercase = (str: string): string => str[0].toUpperCase() + str.slice(1);

export const getSortedOffersByCity = (currentCity: string, sortType: string, offers: Offer[]) => {
  const offersByCity = offers.filter(({city}) => currentCity === city.name);

  let sortedOffersByCity: Offer[] = [];

  switch (sortType) {
    case SortType.DEFAULT:
      sortedOffersByCity = offersByCity;
      break;
    case SortType.LOW_PRICE_FIRST:
      sortedOffersByCity = offersByCity.slice().sort((a: Offer, b: Offer) => a.price - b.price);
      break;
    case SortType.HIGH_PRICE_FIRST:
      sortedOffersByCity = offersByCity.slice().sort((a: Offer, b: Offer) => b.price - a.price);
      break;
    case SortType.TOP_RATED_FIRST:
      sortedOffersByCity = offersByCity.slice().sort((a: Offer, b: Offer) => b.rating - a.rating);
      break;
  }

  return sortedOffersByCity;
};
