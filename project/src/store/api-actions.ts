import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {toast} from 'react-toastify';
import {saveToken, dropToken} from '../services/token';
import {AppDispatch, State} from '../types/state.js';
import {errorHandle} from '../services/error-handle';
import {loadOffers, loadOffer, loadOffersNearby, loadReviewsByOffer, loadFavorites, changeSubmitStatus, changeFavoriteFlag} from './data-process/data-process';
import {requireAuthorization, getUserData} from './user-process/user-process';
import {redirectToRoute} from './action';
import {AppRoute, APIRoute, AuthorizationStatus, SubmitStatus} from '../const';
import {Offer, FavoriteFlag} from '../types/offer';
import {Review, ReviewForForm} from '../types/review';
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';

enum ToastText {
  Success = 'Your review has been sent successfully. Thanks!',
  Error = 'Your review has not been sent. Please try again',
}

export const loadOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadOffers',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(loadOffers(data));
    } catch (error) {
      dispatch(loadOffers([]));
      errorHandle(error);
    }
  },
);

export const loadOfferAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadOffer',
  async (id: number, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      dispatch(loadOffer(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const loadOffersNearbyAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadOffersNearby',
  async (id: number, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
      dispatch(loadOffersNearby(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const loadReviewsByOfferAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadReviewsByOffer',
  async (id: number, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
      dispatch(loadReviewsByOffer(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const postReviewAction = createAsyncThunk<void, ReviewForForm, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postReview',
  async ({id, comment, rating}, {dispatch, extra: api}) => {
    try {
      dispatch(changeSubmitStatus(SubmitStatus.Sending));
      const {data} = await api.post<Review[]>(`${APIRoute.Comments}/${id}`, {comment, rating});
      dispatch(changeSubmitStatus(SubmitStatus.Success));
      dispatch(loadReviewsByOffer(data));
      toast.success(ToastText.Success);
    } catch (error) {
      toast.error(ToastText.Error);
      dispatch(changeSubmitStatus(SubmitStatus.Error));
    }
  },
);

export const loadFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/loadFavorites',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<Offer[]>(`${APIRoute.Favorite}`);
      dispatch(loadFavorites(data));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const setFavoriteAction = createAsyncThunk<void, FavoriteFlag, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/setFavorite',
  async ({id, flag}, {dispatch, extra: api}) => {
    try {
      const {data} = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${flag}`);
      dispatch(changeFavoriteFlag(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(getUserData(data));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    try {
      const {data, data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(getUserData(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(redirectToRoute(AppRoute.Main));
    } catch (error) {
      errorHandle(error);
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api}) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(getUserData({} as UserData));
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(redirectToRoute(AppRoute.SignIn));
    } catch (error) {
      errorHandle(error);
    }
  },
);

