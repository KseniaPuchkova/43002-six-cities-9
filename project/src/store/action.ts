import {createAction} from '@reduxjs/toolkit';

export const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
};

export const changeCity = createAction<string>(Action.CHANGE_CITY);

