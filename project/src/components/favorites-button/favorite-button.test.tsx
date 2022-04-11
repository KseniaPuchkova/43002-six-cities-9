import {render, screen} from '@testing-library/react';
import {Routes, Route} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-route/history-route';
import FavoritesButton from './favorites-button';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeOffers, makeFakeOffer, fakeFavoriteButtonType, fakeUserData} from '../../utils/mocks';

const FAKE_OFFER_ID = 1;
const fakeOffer = makeFakeOffer(FAKE_OFFER_ID);
const fakeOffers = makeFakeOffers();

const api = createAPI();
const history = createMemoryHistory();
const createMockStore = configureMockStore([thunk.withExtraArgument(api)]);

describe('Component: FavoritesButton', () => {
  it('should render correctly', () => {
    const store = createMockStore({
      [NameSpace.Data]: {
        offers: fakeOffers,
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: fakeUserData,
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
});
