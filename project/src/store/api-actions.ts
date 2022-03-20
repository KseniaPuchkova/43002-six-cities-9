import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from '../store';
import {AppRoute, APIRoute, AuthorizationStatus} from '../const';
import {Offer} from '../types/offer';
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';
import {saveToken, dropToken} from '../services/token';
import {errorHandle} from '../services/error-handle';
import {requireAuthorization, loadOffers, redirectToRoute, setUserData} from './action';

export const fetchOffersAction = createAsyncThunk(
  'fetchOffers',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'checkAuth',
  async () => {
    try {
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk(
  'login',
  async ({email, password}: AuthData) => {
    try {
      const {data, data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(setUserData(data));
      store.dispatch(redirectToRoute(AppRoute.Main));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      store.dispatch(redirectToRoute(AppRoute.SignIn));
    } catch (error) {
      errorHandle(error);
    }
  },
);

