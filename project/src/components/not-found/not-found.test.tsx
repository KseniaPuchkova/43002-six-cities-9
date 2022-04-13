import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import {Routes, Route} from 'react-router-dom';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-route/history-route';
import NotFound from './not-found';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const';

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

  it('should navigate to main page when user click', () => {
    history.push('/non-existent-route');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Main}
              element={<h1>This is room page</h1>}
            />
            <Route
              path={'/non-existent-route'}
              element={<NotFound />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    userEvent.click(screen.getByText('Return to main page'));
    expect(screen.getByText(/This is room page/i)).toBeInTheDocument();
  });
});
