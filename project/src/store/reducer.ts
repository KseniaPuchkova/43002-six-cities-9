import {createReducer} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {Review} from '../types/review';
import {UserData} from '../types/user-data';
import {AuthorizationStatus, SortType} from '../const';
import {requireAuthorization, changeCity, changeSortType, loadOffers, loadOffer, loadReviewsByOffer, setUserData} from './action';
import {CITIES} from '../components/cities-list/cities-list';

const DEFAULT_CITY_INDEX = 0;

type InitalState = {
  isDataLoaded: boolean,
  offers: Offer[],
  currentOffer: Offer | null,
  reviewsByOffer: Review[],
  authorizationStatus: AuthorizationStatus,
  userData: UserData,
  activeCity: string,
  sortType: string,
}

const initialState: InitalState = {
  isDataLoaded: false,
  offers: [],
  currentOffer: null,
  reviewsByOffer: [],
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
  sortType: SortType.POPULAR,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadReviewsByOffer, (state, action) => {
      state.reviewsByOffer = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
      state.sortType = SortType.POPULAR;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(loadOffer, (state, action) => {
      state.currentOffer = action.payload;
    });
});
