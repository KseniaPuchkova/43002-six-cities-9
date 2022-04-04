import {AuthorizationStatus} from '../../const';
import {State} from '../../types/state';
import {UserData} from '../../types/user-data';
import {NameSpace} from '../../const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;

export const getUserData = (state: State): UserData => state.USER.userData;
