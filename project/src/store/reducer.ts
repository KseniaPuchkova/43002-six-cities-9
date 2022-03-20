import {createReducer} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {UserData} from '../types/user-data';
import {AuthorizationStatus, SortType} from '../const';
import {requireAuthorization, changeCity, changeSortType, loadOffers, setUserData} from './action';
import {CITIES} from '../components/cities-list/cities-list';
import {getOffersByCity, getSortedOffers} from '../utils';

const DEFAULT_CITY_INDEX = 0;

type InitalState = {
  isDataLoaded: boolean,
  offers: Offer[],
  authorizationStatus: AuthorizationStatus,
  userData: UserData,
  activeCity: string,
  offersByCity: Offer[],
  sortType: string,
  sortedOffers: Offer[],
}

const initialState: InitalState = {
  isDataLoaded: false,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {
    avatarUrl: '',
    email: '',
    id: Number(),
    isPro: false,
    name: '',
    token: '',
  },
  activeCity: CITIES[DEFAULT_CITY_INDEX],
  offersByCity: [],
  sortType: SortType.POPULAR,
  sortedOffers: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
      state.offersByCity = getOffersByCity(state.activeCity, initialState.offers);
      state.sortType = SortType.POPULAR;
      state.sortedOffers = getSortedOffers(state.sortType, state.offersByCity);
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
      state.sortedOffers = getSortedOffers(state.sortType, state.offersByCity);
    });
});
