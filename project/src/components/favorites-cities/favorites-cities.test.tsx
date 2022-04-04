import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import FavoritesCities from './favorites-cities';
import {AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeOffers, fakeUserData} from '../../utils/mocks';

const default_city = "Paris";
const fakeOffers = makeFakeOffers();

const createMockStore = configureMockStore();
const store = createMockStore({
  [NameSpace.App]: {
    activeCity: default_city,
  },
  [NameSpace.Data]: {
    offers: fakeOffers.filter(({isFavorite}) => isFavorite),
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: fakeUserData,
  },
});
const history = createMemoryHistory();

describe('Component: FavoritesCities', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesCities city={default_city} favorites={fakeOffers} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(default_city)).toBeInTheDocument();
  });
});
