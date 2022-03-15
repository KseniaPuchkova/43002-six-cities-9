import {createAction} from '@reduxjs/toolkit';
import { Offer } from '../types/offer';

export enum Action {
  CHANGE_CITY = 'Change_City',
  CHANGE_SORT_TYPE = 'Change_Sort_Type',
}

export const changeCity = createAction<string>(Action.CHANGE_CITY);
export const changeSortType = createAction<string>(Action.CHANGE_SORT_TYPE);
export const loadOffersAction = createAction<Offer[]>('loadOffers');

