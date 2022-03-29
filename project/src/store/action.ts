import {createAction} from '@reduxjs/toolkit';
import {AppRoute} from '../const';

export enum Action {
  REDIRECT_TO_ROUTE = 'Redirect_To_Route',
}

export const redirectToRoute = createAction<AppRoute>(Action.REDIRECT_TO_ROUTE);


