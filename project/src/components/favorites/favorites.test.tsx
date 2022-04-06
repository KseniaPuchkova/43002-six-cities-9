import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import Favorites from './favorites';
import {AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeOffers, fakeUserData} from '../../utils/mocks';

const fakeOffers = makeFakeOffers();

const history = createMemoryHistory();
const createMockStore = configureMockStore();

describe('Component: Favorites', () => {
  it('should render correctly with favotires', () => {
    const store = createMockStore({
      [NameSpace.Data]: {
        offers: fakeOffers.filter(({isFavorite}) => isFavorite),
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: fakeUserData,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Favorites />
        </HistoryRouter>;
      </Provider>,
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render correctly without favorites', () => {
    const store = createMockStore({
      [NameSpace.Data]: {
        offers: fakeOffers.filter(({isFavorite}) => !isFavorite),
      },
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: fakeUserData,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Favorites />
        </HistoryRouter>;
      </Provider>,
    );

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });
});
