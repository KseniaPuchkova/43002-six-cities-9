import {createAsyncThunk} from '@reduxjs/toolkit';
import {api, store} from '../store';
import {AppRoute, APIRoute, AuthorizationStatus, HTTP_CODE} from '../const';
import {Offer, Favorite} from '../types/offer';
import {Review} from '../types/review';
import {UserData} from '../types/user-data';
import {AuthData} from '../types/auth-data';
import {saveToken, dropToken} from '../services/token';
import {errorHandle, getStatusCode} from '../services/error-handle';
import {requireAuthorization, loadOffers, loadOffer, loadOffersNearby, loadReviewsByOffer, getUserInfo, redirectToRoute} from './action';

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

export const fetchOfferAction = createAsyncThunk(
  'fetchOffer',
  async (id: number) => {
    try {
      const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
      store.dispatch(loadOffer(data));
    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchOffersNearbyAction = createAsyncThunk(
  'fetchOffersNearby',
  async (id: number) => {
    try {
      if (!id) {
        return;
      }

      const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);
      store.dispatch(loadOffersNearby(data));

    } catch (error) {
      errorHandle(error);
    }
  },
);

export const fetchReviewsAction = createAsyncThunk(
  'fetchReviewsByOffer',
  async (id: number) => {
    try {
      if (!id) {
        return;
      }

      const {data} = await api.get<Review[]>(`${APIRoute.Comments}/${id}`);
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
      await api.get(APIRoute.Login);
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      errorHandle(error);
      store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const setIsFavoriteAction = createAsyncThunk(
  'setIsFavorite',
  async ({isFavorite, offerId: id}: Favorite) => {
    try {
      await api.post<Offer>(`${APIRoute.Favorite}/${id}/${isFavorite ? 1 : 0}`);
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
      store.dispatch(requireAuthorization(AuthorizationStatus.Auth));
      store.dispatch(getUserInfo(data));
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

