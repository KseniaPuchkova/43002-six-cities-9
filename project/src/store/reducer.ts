
import {createReducer} from '@reduxjs/toolkit';
import {SortType} from '../const';
import {getSortedOffersByCity} from '../utils';
import {changeCity, changeSortType} from './action';
import {CITIES} from '../components/cities-list/cities-list';
import {offers} from '../mocks/offers';

const DEFAULT_CITY_INDEX = 0;

const initialState = {
  offers: [],
  activeCity: CITIES[DEFAULT_CITY_INDEX],
  sortType: SortType.POPULAR,
  sortedOffersByCity: getSortedOffersByCity(CITIES[DEFAULT_CITY_INDEX], SortType.POPULAR, offers),
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
      state.sortedOffersByCity = getSortedOffersByCity(state.activeCity, state.sortType, offers);
    });
  builder
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
      state.sortedOffersByCity= getSortedOffersByCity(state.activeCity, state.sortType, offers);
    });
});
