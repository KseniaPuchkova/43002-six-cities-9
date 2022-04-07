import {createSelector} from 'reselect';
import {getOffers} from '../data-process/selectors';
import {getOffersByCity, getSortedOffers} from '../../utils/utils';
import {NameSpace} from '../../const';
import {State} from '../../types/state';

export const getActiveCity = (state: State): string => state[NameSpace.App].activeCity;

export const getSortType = (state: State): string => state[NameSpace.App].sortType;

export const getOffersByActiveCity = createSelector(
  [getActiveCity, getOffers], (activeCity, offers) => getOffersByCity(activeCity, offers),
);

export const getSortedOffersByActiveCity = createSelector(
  [getSortType, getOffersByActiveCity], (sortType, offersByCity) => getSortedOffers(sortType, offersByCity),
);

