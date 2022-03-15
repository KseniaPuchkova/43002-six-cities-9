import {createReducer} from '@reduxjs/toolkit';
import {SortType} from '../const';
import {changeCity, changeSortType, loadOffersAction} from './action';
import {CITIES} from '../components/cities-list/cities-list';
import {offers} from '../mocks/offers';
import {getOffersByCity, getSortedOffers} from '../utils';

const DEFAULT_CITY_INDEX = 0;
const offersByCity = getOffersByCity(CITIES[DEFAULT_CITY_INDEX], offers);

const initialState = {
  offers: offers,
  activeCity: CITIES[DEFAULT_CITY_INDEX],
  offersByCity: offersByCity,
  sortType: SortType.POPULAR,
  sortedOffers: offersByCity,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
      state.offersByCity = getOffersByCity(state.activeCity, offers);
      state.sortType = SortType.POPULAR;
      state.sortedOffers = getSortedOffers(state.sortType, state.offersByCity);
    });
  builder
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
      state.sortedOffers = getSortedOffers(state.sortType, state.offersByCity);
    });
  builder
    .addCase(loadOffersAction, (state, action) => {
      state.offers = action.payload;
    });
});
