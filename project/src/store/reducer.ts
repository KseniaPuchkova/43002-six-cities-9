import {createReducer} from '@reduxjs/toolkit';
import {SortType} from '../const';
import {changeCity, changeSortType, loadOffers} from './action';
import {CITIES} from '../components/cities-list/cities-list';
import {Offer} from '../types/offer';

const DEFAULT_CITY_INDEX = 0;

export type initialStateProps = {
  activeCity: string,
  sortType: string,
  offers: Offer[],
}

const initialState: initialStateProps = {
  activeCity: CITIES[DEFAULT_CITY_INDEX],
  sortType: SortType.POPULAR,
  offers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
      state.sortType = SortType.POPULAR;
    });
  builder
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    });
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});
