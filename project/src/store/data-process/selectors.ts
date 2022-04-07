import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offer} from '../../types/offer';
import {Review} from '../../types/review';

export const getOffers = (state: State): Offer[] => state.DATA.offers;

export const isDataLoadedStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;

export const getCurrentOffer = (state: State): Offer | null => state[NameSpace.Data].currentOffer;

export const getOffersNearby = (state: State): Offer[] => state[NameSpace.Data].offersNearby;

export const getReviewsByOffer = (state: State): Review[] => state[NameSpace.Data].reviewsByOffer;

export const getFavorites = (state: State): Offer[] => state[NameSpace.Data].favorites;

export const getSubmitStatus = (state: State): number => state[NameSpace.Data].submitStatus;
