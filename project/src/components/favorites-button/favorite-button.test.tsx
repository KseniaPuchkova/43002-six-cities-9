import {render, screen, fireEvent} from '@testing-library/react';
import {Routes, Route} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import * as Redux from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-route/history-route';
import FavoritesButton from './favorites-button';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeOffers, makeFakeOffer, fakeFavoriteButtonType, fakeUserData} from '../../utils/mocks';

const FAKE_OFFER_ID = 1;
const fakeOffer = makeFakeOffer(FAKE_OFFER_ID);
const fakeOffers = makeFakeOffers();

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Component: FavoritesButton', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        offers: fakeOffers,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: {},
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<FavoritesButton offer={fakeOffer} favoriteButtonType={fakeFavoriteButtonType} />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('button')).toHaveClass('button');
    expect(screen.getByRole('button').getAttribute('type')).toBe('button');
  });

  it('should dispatch data when user authorized clicked to button', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        offers: fakeOffers,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: fakeUserData,
      },
    });

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<FavoritesButton offer={fakeOffer} favoriteButtonType={fakeFavoriteButtonType} />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(useDispatch).toBeCalledTimes(1);
  });

  it('should dispatch with payload "redirect to route" when user unauthorized clicked to button', () => {
    const store = mockStore({
      [NameSpace.Data]: {
        offers: fakeOffers,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: {},
      },
    });

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<FavoritesButton offer={fakeOffer} favoriteButtonType={fakeFavoriteButtonType} />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(1, {
      type: 'app/redirectToRoute', payload: AppRoute.SignIn,
    });
  });
});
