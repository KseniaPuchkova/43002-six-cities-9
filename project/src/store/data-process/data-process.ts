import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, SubmitStatus} from '../../const';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';

type InitalState = {
  offers: Offer[],
  isDataLoaded: boolean,
  currentOffer: Offer | null,
  offersNearby: Offer[],
  reviewsByOffer: Review[],
  favorites: Offer[],
  submitStatus: number,
}

const initialState: InitalState = {
  offers: [],
  isDataLoaded: false,
  currentOffer: null,
  offersNearby: [],
  reviewsByOffer: [],
  favorites: [],
  submitStatus: SubmitStatus.Unknown,
};

export const dataProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    loadOffers: (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    },
    loadOffer: (state, action) => {
      state.currentOffer = action.payload;
    },
    loadOffersNearby: (state, action) => {
      state.offersNearby = action.payload;
    },
    loadReviewsByOffer: (state, action) => {
      state.reviewsByOffer = action.payload;
    },
    loadFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    changeFavoriteFlag: (state, action) => {
      const {id} = action.payload;
      state.currentOffer = action.payload;

      const indexOffer = state.offers.findIndex((offer) => offer.id === id);
      state.offers[indexOffer] = action.payload;

      const indexOfferNearby = state.offersNearby.findIndex((offer) => offer.id === id);
      state.offersNearby[indexOfferNearby] = action.payload;

      state.favorites = state.favorites.filter((offer) => offer.id !== id);
    },
    changeSubmitStatus: (state, action) => {
      state.submitStatus = action.payload;
    },
  },
});

export const {loadOffers, loadOffer, loadOffersNearby, loadReviewsByOffer, loadFavorites, changeFavoriteFlag, changeSubmitStatus} = dataProcess.actions;
