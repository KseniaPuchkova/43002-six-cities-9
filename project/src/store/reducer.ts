import {createReducer} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {Review} from '../types/review';
import {UserData} from '../types/user-data';
import {AuthorizationStatus, SortType} from '../const';
import {requireAuthorization,
  changeCity,
  changeSortType,
  loadOffers,
  loadOffer,
  loadReviewsByOffer,
  loadFavoriteOffers,
  loadOffersNearby,
  getUserData} from './action';
import {CITIES} from '../components/cities-list/cities-list';

const DEFAULT_CITY_INDEX = 0;

type InitalState = {
  offers: Offer[],
  isDataLoaded: boolean,
  currentOffer: Offer | null,
  nearOffers: Offer[],
  reviewsByOffer: Review[],
  favoriteOffers: Offer[],
  authorizationStatus: AuthorizationStatus,
  userData: UserData | null,
  activeCity: string,
  sortType: string,
}

const initialState: InitalState = {
  offers: [],
  isDataLoaded: false,
  currentOffer: null,
  nearOffers: [],
  reviewsByOffer: [],
  favoriteOffers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  activeCity: CITIES[DEFAULT_CITY_INDEX],
  sortType: SortType.POPULAR,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.nearOffers = action.payload;
    })
    .addCase(loadReviewsByOffer, (state, action) => {
      state.reviewsByOffer = action.payload;
    })
    .addCase(loadFavoriteOffers, (state, action) => {
      state.favoriteOffers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(getUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
      state.sortType = SortType.POPULAR;
    })
    .addCase(changeSortType, (state, action) => {
      state.sortType = action.payload;
    });
});
