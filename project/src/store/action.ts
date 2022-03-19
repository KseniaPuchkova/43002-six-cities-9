import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';
import {AuthorizationStatus} from '../const';

export enum Action {
  CHANGE_CITY = 'Change_City',
  CHANGE_SORT_TYPE = 'Change_Sort_Type',
  LOAD_OFFERS = 'Load_Offers',
  REQUIRE_AUTHORIZATION = 'Require_Authorization',
  SET_ERROR = 'Set_Error',
}

export const changeCity = createAction<string>(Action.CHANGE_CITY);
export const changeSortType = createAction<string>(Action.CHANGE_SORT_TYPE);
export const loadOffers = createAction<Offer[]>(Action.LOAD_OFFERS);
export const requireAuthorization = createAction<AuthorizationStatus>(Action.REQUIRE_AUTHORIZATION);
export const setError = createAction<string>(Action.SET_ERROR);

