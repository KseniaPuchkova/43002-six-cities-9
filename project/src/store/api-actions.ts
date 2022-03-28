import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from '../store/store';
import {saveToken, dropToken} from '../services/token';
import {errorHandle, getStatusCode} from '../services/error-handle';
import {loadOffers, loadOffer, loadOffersNearby, loadReviewsByOffer, loadFavorites} from './data-process/data-process';
import {requireAuthorization, getUserData} from './user-process/user-process';
import {changeSubmitStatus} from './data-process/data-process';
import {redirectToRoute} from './action';
import {AppRoute, APIRoute, AuthorizationStatus, HttpCode, SubmitStatus} from '../const';
import {Offer, FavoriteFlag} from '../types/offer';
import {Review, ReviewForForm} from '../types/review';
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';

export const loadOffersAction = createAsyncThunk(
  'data/loadOffers',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
    } catch (error) {
      store.dispatch(loadOffers([]));
      errorHandle(error);
    }
  },
);

export const loadOfferAction = createAsyncThunk(
  'data/loadOffer',
  async (id: number) => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      store.dispatch(loadOffer(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const loadOffersNearbyAction = createAsyncThunk(
  'data/loadOffersNearby',
  async (id: number) => {
    try {
      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
      store.dispatch(loadOffersNearby(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const loadReviewsByOfferAction = createAsyncThunk(
  'data/loadReviewsByOffer',
  async (id: number) => {
    try {
      const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
      store.dispatch(loadReviewsByOffer(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const postReviewAction = createAsyncThunk(
  'data/postReview',
  async ({id, comment, rating}: ReviewForForm) => {
    try {
      store.dispatch(changeSubmitStatus(SubmitStatus.Sending));
      const {data} = await api.post<Review[]>(`${APIRoute.Comments}/${id}`, {comment, rating});
      store.dispatch(changeSubmitStatus(SubmitStatus.Success));
      store.dispatch(loadReviewsByOffer(data));
    } catch (error) {
      errorHandle(error);
      store.dispatch(changeSubmitStatus(SubmitStatus.Error));
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'user/checkAuth',
  async () => {
    try {
      const {data} = await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(getUserData(data));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loadFavoritesAction = createAsyncThunk(
  'data/loadFavorites',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(`${APIRoute.Favorite}`);
      store.dispatch(loadFavorites(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const setFavoriteAction = createAsyncThunk(
  'data/setFavorite',
  async ({id, flag}: FavoriteFlag) => {
    try {
      await api.post<Offer>(`${APIRoute.Favorite}/${id}/${flag}`);
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
      store.dispatch(loadFavoritesAction());
    } catch (error) {
      const status = getStatusCode(error);
      if (status === HttpCode.Unauthorized) {
        store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth),
        );
        return;
      }
      errorHandle(error);
    }
  },
);

export const loginAction = createAsyncThunk(
  'user/login',
  async ({email, password}: AuthData) => {
    try {
      const {data, data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      store.dispatch(getUserData(data));
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(redirectToRoute(AppRoute.Main));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const logoutAction = createAsyncThunk(
  'user/logout',
  async () => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      store.dispatch(getUserData({} as UserData));
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      store.dispatch(redirectToRoute(AppRoute.SignIn));
    } catch (error) {
      errorHandle(error);
    }
  },
);

