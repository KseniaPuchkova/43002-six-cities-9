import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import NotFound from './not-found';
import {AuthorizationStatus, NameSpace} from '../../const';

const history = createMemoryHistory();
const createMockStore = configureMockStore();
const store = createMockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: {},
  },
});

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NotFound />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Return to main page')).toBeInTheDocument();
  });
});
