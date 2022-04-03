
import {userProcess, requireAuthorization, getUserData} from './user-process';
import {fakeUserData} from '../../utils/mocks';
import {AuthorizationStatus} from '../../const';
import {UserData} from '../../types/user-data';

describe('Reducer: userProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: {} as UserData,
      });
  });

  it('should change the status to authorized by require authorization', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: fakeUserData,
    };
    expect(userProcess.reducer(state, requireAuthorization(AuthorizationStatus.Auth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userData: fakeUserData,
      });
  });

  it('should get user an email and a password', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: {} as UserData,
    };
    expect(userProcess.reducer(state, getUserData(fakeUserData)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userData: fakeUserData,
      });
  });

  it('should change the status to unauthorized', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: {} as UserData,
    };
    expect(userProcess.reducer(state, requireAuthorization(AuthorizationStatus.NoAuth)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: {} as UserData,
      });
  });
});
