import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import Favorites from './favorites';
import {makeFakeOffers, fakeUserData} from '../../utils/mocks';
import {AuthorizationStatus, NameSpace} from '../../const';

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
        </HistoryRouter>
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
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
    expect(screen.getByText(/Save properties to narrow down search or plan your future trips./i)).toBeInTheDocument();
  });
});
