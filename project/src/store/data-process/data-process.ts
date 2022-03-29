import {createSlice} from '@reduxjs/toolkit';
import {Process, SubmitStatus} from '../../const';
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
  name: Process.Data,
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
    changeSubmitStatus: (state, action) => {
      state.submitStatus = action.payload;
    },
  },
});

export const {loadOffers, loadOffer, loadOffersNearby, loadReviewsByOffer, loadFavorites, changeSubmitStatus} = dataProcess.actions;
