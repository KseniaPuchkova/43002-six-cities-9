
import {createReducer} from '@reduxjs/toolkit';
import {changeCity} from './action';
import {getOffersByCity} from '../utils';
import {offers} from '../mocks/offers';
import {CITIES} from '../components/cities-list/cities-list';

const DEFAULT_CITY_INDEX = 0;

const initialState = {
  activeCity: CITIES[DEFAULT_CITY_INDEX],
  offersByCity: getOffersByCity(CITIES[DEFAULT_CITY_INDEX], offers),
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
      state.offersByCity = getOffersByCity(action.payload, offers);
    });
});
