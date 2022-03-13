import {createAction} from '@reduxjs/toolkit';
import {Offer} from '../types/offer';

export enum Action {
  CHANGE_CITY = 'Change_City',
  CHANGE_SORT_TYPE = 'Change_Sort_Type',
  LOAD_OFFERS = 'Load_Offers',
}

export const changeCity = createAction<string>(Action.CHANGE_CITY);
export const changeSortType = createAction<string>(Action.CHANGE_SORT_TYPE);
export const loadOffers = createAction<Offer[]>(Action.LOAD_OFFERS);


