import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../const';
import {UserData} from '../../types/user-data';

type InitalState = {
  authorizationStatus: AuthorizationStatus,
  userData: UserData,
}

const initialState: InitalState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {} as UserData,
};


export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    requireAuthorization: (state, action) => {
      state.authorizationStatus = action.payload;
    },
    getUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const {requireAuthorization, getUserData} = userProcess.actions;
