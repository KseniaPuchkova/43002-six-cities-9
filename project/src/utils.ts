import {Offer} from './types/offer';

import {MAX_RATING} from './components/review-item/review-item';

export const getRatingInPercent = (rating: number): string => `${rating * 100 / MAX_RATING}%`;

export const makeFirstLetterUppercase = (str: string): string => str[0].toUpperCase() + str.slice(1);

export const getOffersByCity = (currentCity: string, offers: Offer[]): Offer[] => offers.filter(({city}) => currentCity === city.name);
