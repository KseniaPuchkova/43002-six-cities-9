import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from '../store';
import {AppRoute, APIRoute, AuthorizationStatus, HTTP_CODE} from '../const';
import {Offer, FavoriteFlag} from '../types/offer';
import {Review, ReviewForForm} from '../types/review';
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';
import {saveToken, dropToken} from '../services/token';
import {errorHandle, getStatusCode} from '../services/error-handle';
import {
  requireAuthorization,
  loadOffers,
  loadOffer,
  loadOffersNearby,
  loadReviewsByOffer,
  loadFavorites,
  redirectToRoute,
  getUserData} from './action';

export const loadOffersAction = createAsyncThunk(
  'loadOffers',
  async () => {
    try {
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const loadOfferAction = createAsyncThunk(
  'loadOffer',
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
  'loadOffersNearby',
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
  'loadReviewsByOffer',
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
  'postReview',
  async ({id, comment, rating}: ReviewForForm) => {
    try {
      const {data} = await api.post<Review[]>(`${APIRoute.Comments}/${id}`, {comment, rating});
      store.dispatch(loadReviewsByOffer(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const checkAuthAction = createAsyncThunk(
  'checkAuth',
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
  'loadFavorites',
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
  'setFavorite',
  async ({id, flag}: FavoriteFlag) => {
    try {
      await api.post<Offer>(`${APIRoute.Favorite}/${id}/${flag}`);
      const {data} = await api.get<Offer[]>(APIRoute.Offers);
      store.dispatch(loadOffers(data));
      store.dispatch(loadFavoritesAction());
    } catch (error) {
      const status = getStatusCode(error);
      if (status === HTTP_CODE.UNAUTHORIZED) {
        store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth),
        );
        return;
      }
      errorHandle(error);
    }
  },
);

export const loginAction = createAsyncThunk(
  'login',
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

