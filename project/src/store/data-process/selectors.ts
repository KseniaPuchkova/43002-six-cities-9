import {State} from '../../types/state';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';

export const getOffers = (state: State): Offer[] => state.DATA.offers;

export const isDataLoadedStatus = (state: State): boolean => state.DATA.isDataLoaded;

export const getCurrentOffer = (state: State): Offer | null => state.DATA.currentOffer;

export const getOffersNearby = (state: State): Offer[] => state.DATA.offersNearby;

export const getReviewsByOffer = (state: State): Review[] => state.DATA.reviewsByOffer;

export const getFavorites = (state: State): Offer[] => state.DATA.favorites;

export const getSubmitStatus = (state: State): number => state.DATA.submitStatus;
