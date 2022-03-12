
import {createReducer} from '@reduxjs/toolkit';
import {changeCity, changeSortType} from './action';
import {SortType} from '../const';
import {getSortedOffersByCity} from '../utils';
import {CITIES} from '../components/cities-list/cities-list';
import {offers} from '../mocks/offers';

const DEFAULT_CITY_INDEX = 3;

const initialState = {
  offers: [],
  activeCity: CITIES[DEFAULT_CITY_INDEX],
  sortType: SortType.LOW_PRICE_FIRST,
  offersBySortType: getSortedOffersByCity(CITIES[DEFAULT_CITY_INDEX], SortType.LOW_PRICE_FIRST, offers),
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
    });
  builder
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
      state.offersBySortType = getSortedOffersByCity(state.activeCity, state.sortType , offers);
    });
});
