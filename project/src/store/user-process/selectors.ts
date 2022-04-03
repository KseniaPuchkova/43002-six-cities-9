import {AuthorizationStatus} from '../../const';
import {State} from '../../types/state';
import {UserData} from '../../types/user-data';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state.USER.authorizationStatus;

export const getIsUserAuthorized = (state: State): boolean => state.USER.authorizationStatus === AuthorizationStatus.Auth;

export const getUserData = (state: State): UserData => state.USER.userData;
