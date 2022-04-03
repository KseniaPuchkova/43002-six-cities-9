import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {loadOffersAction, loadOfferAction, loadOffersNearbyAction, loadReviewsByOfferAction, postReviewAction, checkAuthAction, loadFavoritesAction, setFavoriteAction, loginAction, logoutAction} from './api-actions';
import {requireAuthorization, getUserData} from './user-process/user-process';
import {loadOffers, loadOffer, loadOffersNearby, loadReviewsByOffer, loadFavorites, changeSubmitStatus} from './data-process/data-process';
import {redirectToRoute} from './action';
import {makeFakeOffer, makeFakeOffers, makeFakeReviewByOffer, makeFakeReviewsByOffer, fakeUserData, fakeAuthData} from '../utils/mocks';
import {APIRoute, HttpCode} from '../const';
import {State} from '../types/state';

const FAKE_OFFER_ID = 0;

const fakeOffer = makeFakeOffer(FAKE_OFFER_ID);
const fakeOffers = makeFakeOffers();
const fakeReviewByOffer = makeFakeReviewByOffer(FAKE_OFFER_ID);
const fakeReviewsByOffer = makeFakeReviewsByOffer();

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should make a correct API call to GET /offers', async () => {
    const store = mockStore();

    mockAPI
      .onGet(APIRoute.Offers)
      .reply(HttpCode.Success, fakeOffers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadOffersAction());

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadOffers.toString());
  });

  it('should make a correct API call to GET /offers (server returns 400)', async () => {
    const store = mockStore();

    mockAPI
      .onGet(APIRoute.Offers)
      .reply(HttpCode.BadRequest);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadOffersAction());

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadOffers.toString());
  });

  it('should make a correct API call to GET /offer', async () => {
    const store = mockStore();
    const id = fakeOffer.id;

    mockAPI
      .onGet(`${APIRoute.Offers}/${id}`)
      .reply(HttpCode.Success, fakeOffer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadOfferAction(id));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadOffer.toString());
  });

  it('should make a correct API call to GET /offers/:id/nearby', async () => {
    const store = mockStore();
    const id = fakeOffer.id;

    mockAPI
      .onGet(`${APIRoute.Offers}/${id}/nearby`)
      .reply(HttpCode.Success, fakeOffers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadOffersNearbyAction(id));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadOffersNearby.toString());
  });

  it('should make a correct API call to GET /comments/:id', async () => {
    const store = mockStore();
    const id = fakeOffer.id;

    mockAPI
      .onGet(`${APIRoute.Comments}/${id}`)
      .reply(HttpCode.Success, fakeReviewsByOffer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadReviewsByOfferAction(id));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadReviewsByOffer.toString());
  });

  it('should make a correct API call to POST /comments/:id', async () => {
    const store = mockStore();
    const id = fakeOffer.id;
    const {comment, rating} = fakeReviewByOffer;

    mockAPI
      .onPost(`${APIRoute.Comments}/${id}`)
      .reply(HttpCode.Success, fakeReviewsByOffer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postReviewAction({id, comment, rating}));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeSubmitStatus.toString());
    expect(actions).toContain(loadReviewsByOffer.toString());
  });

  it('should make a correct API call to POST /comments/:id and change status (server returns 400)', async () => {
    const store = mockStore();
    const id = fakeOffer.id;
    const {comment, rating} = fakeReviewByOffer;

    mockAPI
      .onPost(`${APIRoute.Comments}/${id}`)
      .reply(HttpCode.BadRequest, fakeReviewsByOffer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(postReviewAction({id, comment, rating}));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(changeSubmitStatus.toString());
  });

  it('should load favorites to GET when server returns 200', async () => {
    const store = mockStore();

    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(HttpCode.Success, fakeOffers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(loadFavoritesAction());

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadFavorites.toString());
  });

  it('should make a correct API call to POST /favorites/:id/ and add to favorites', async () => {
    const store = mockStore();
    const fakeFavoriteOffer = {
      ...fakeOffer,
      id: 1,
      isFavorite: true,
    };
    const id = fakeFavoriteOffer.id;
    const flag = Number(fakeFavoriteOffer.isFavorite);

    mockAPI
      .onPost(`${APIRoute.Favorite}/${id}/${flag}`)
      .reply(HttpCode.Success, fakeFavoriteOffer);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(setFavoriteAction({id, flag}));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(loadOffersAction.toString());
  });

  it('should redirect to login (server returns 401)', async () => {
    const store = mockStore();
    const fakeFavoriteOffer = {
      ...fakeOffer,
      id: 1,
      isFavorite: true,
    };
    const id = fakeFavoriteOffer.id;
    const flag = Number(fakeFavoriteOffer.isFavorite);

    mockAPI
      .onPost(`${APIRoute.Favorite}/${id}/${flag}`)
      .reply(HttpCode.Unauthorized);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(setFavoriteAction({id, flag}));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(redirectToRoute.toString());
  });

  it('should make a correct API call to GET /login and get user data', async () => {
    const store = mockStore();

    mockAPI
      .onGet(APIRoute.Login)
      .reply(HttpCode.Success, fakeUserData);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(requireAuthorization.toString());
    expect(actions).toContain(getUserData.toString());
  });

  it('should make a correct API call to POST /login and redirect to main page', async () => {
    const store = mockStore();

    mockAPI
      .onPost(APIRoute.Login)
      .reply(HttpCode.Success, {token: 'secret'});

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeAuthData));

    const actions = store.getActions().map(({type}) => type);
    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities', 'secret');

    expect(actions).toContain(requireAuthorization.toString());
    expect(actions).toContain(redirectToRoute.toString());
  });

  it('should make a correct API call to delete /login', async () => {
    const store = mockStore();

    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(HttpCode.NoContent);

    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities');

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toContain(getUserData.toString());
    expect(actions).toContain(requireAuthorization.toString());
    expect(actions).toContain(redirectToRoute.toString());
  });
});
