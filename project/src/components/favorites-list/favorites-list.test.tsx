import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import FavoritesList from './favorites-list';
import {AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeOffers, fakeUserData} from '../../utils/mocks';

const fakeOffers = makeFakeOffers();

const createMockStore = configureMockStore();
const store = createMockStore({
  [NameSpace.Data]: {
    offers: fakeOffers,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: fakeUserData,
  },
});
const history = createMemoryHistory();

describe('Component: FavoritesList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesList favorites={fakeOffers} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
