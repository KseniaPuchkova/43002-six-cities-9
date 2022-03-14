import {createAction} from '@reduxjs/toolkit';

export enum Action {
  CHANGE_CITY = 'Change_City',
  CHANGE_SORT_TYPE = 'Change_Sort_Type',
  RESET_SORT = 'Reset_Sort'
}

export const changeCity = createAction<string>(Action.CHANGE_CITY);
export const changeSortType = createAction<string>(Action.CHANGE_SORT_TYPE);

