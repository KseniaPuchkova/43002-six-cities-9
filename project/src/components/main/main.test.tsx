import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import Main from './main';
import {fakeCity, makeFakeOffers} from '../../utils/mocks';
import {AuthorizationStatus, SortType, NameSpace} from '../../const';

const fakeOffers = makeFakeOffers();

const createMockStore = configureMockStore();
const store = createMockStore({
  [NameSpace.App]: {
    activeCity: fakeCity,
    sortType: SortType.POPULAR,
  },
  [NameSpace.Data]: {
    offers: fakeOffers,
    isDataLoaded: true,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: {},
  },
});
const history = createMemoryHistory();

describe('Component: Main', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
  });
});
