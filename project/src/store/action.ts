import {createAction} from '@reduxjs/toolkit';

export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  CHANGE_SORT_TYPE: 'CHANGE_SORT_TYPE',
};

export const changeCity = createAction<string>(Action.CHANGE_CITY);
export const changeSortType = createAction<string>(Action.CHANGE_SORT_TYPE);

