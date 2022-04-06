import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import FavoritesCities from './favorites-cities';
import {AuthorizationStatus, NameSpace} from '../../const';
import {fakeCity, makeFakeOffers, fakeUserData} from '../../utils/mocks';

const fakeOffers = makeFakeOffers();

const history = createMemoryHistory();
const createMockStore = configureMockStore();
const store = createMockStore({
  [NameSpace.App]: {
    activeCity: fakeCity,
  },
  [NameSpace.Data]: {
    offers: fakeOffers.filter(({isFavorite}) => isFavorite),
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: fakeUserData,
  },
});

describe('Component: FavoritesCities', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesCities city={fakeCity} favorites={fakeOffers} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeCity)).toBeInTheDocument();
  });
});
