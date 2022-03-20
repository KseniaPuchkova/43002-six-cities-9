import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {Review} from '../types/review';
import {UserData} from '../types/user-data';
import {AuthorizationStatus, AppRoute} from '../const';

export enum Action {
  LOAD_OFFERS = 'Load_Offers',
  LOAD_OFFER = 'Load_Offer',
  LOAD_REVIEWS_BY_OFFER = 'Load_Reviews_By_Offer',
  REQUIRE_AUTHORIZATION = 'Require_Authorization',
  SET_USER_DATA = 'Set_User_Data',
  CHANGE_CITY = 'Change_City',
  CHANGE_SORT_TYPE = 'Change_Sort_Type',
  REDIRECT_TO_ROUTE = 'Redirect_To_Route',
}

export const loadOffers = createAction<Offer[]>(Action.LOAD_OFFERS);
export const loadReviewsByOffer = createAction<Review[]>(Action.LOAD_REVIEWS_BY_OFFER);
export const requireAuthorization = createAction<AuthorizationStatus>(Action.REQUIRE_AUTHORIZATION);
export const setUserData = createAction<UserData>(Action.SET_USER_DATA);
export const changeCity = createAction<string>(Action.CHANGE_CITY);
export const changeSortType = createAction<string>(Action.CHANGE_SORT_TYPE);
export const redirectToRoute = createAction<AppRoute>(Action.REDIRECT_TO_ROUTE);
export const loadOffer = createAction<Offer>(Action.LOAD_OFFER);

