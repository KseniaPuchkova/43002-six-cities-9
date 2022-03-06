import {MAX_RATING} from './const';

export const getRatingInPercent = (rating: number): string => `${rating * 100 / MAX_RATING}%`;

export const makeFirstLetterUppercase = (str: string): string => str[0].toUpperCase() + str.slice(1);
