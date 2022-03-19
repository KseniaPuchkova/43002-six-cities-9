import {createReducer} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {AuthorizationStatus, SortType} from '../const';
import {requireAuthorization, changeCity, changeSortType, loadOffers, setError} from './action';
import {CITIES} from '../components/cities-list/cities-list';
import {getOffersByCity, getSortedOffers} from '../utils';

const DEFAULT_CITY_INDEX = 0;

type InitalState = {
  isDataLoaded: boolean,
  offers: Offer[],
  authorizationStatus: AuthorizationStatus,
  activeCity: string,
  offersByCity: Offer[],
  sortType: string,
  sortedOffers: Offer[],
  error: string,
}

const initialState: InitalState = {
  isDataLoaded: false,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  activeCity: CITIES[DEFAULT_CITY_INDEX],
  offersByCity: [],
  sortType: SortType.POPULAR,
  sortedOffers: [],
  error: '',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
      state.offersByCity = getOffersByCity(state.activeCity, initialState.offers);
      state.sortType = SortType.POPULAR;
      state.sortedOffers = getSortedOffers(state.sortType, state.offersByCity);
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
      state.sortedOffers = getSortedOffers(state.sortType, state.offersByCity);
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
