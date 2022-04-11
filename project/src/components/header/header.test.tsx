import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import Header from './header';
import {fakeUserData} from '../../utils/mocks';
import {AppRoute, AuthorizationStatus, NameSpace} from '../../const';

const history = createMemoryHistory();
let createMockStore = configureMockStore();
let store = createMockStore();

describe('Component: Header', () => {
  it('should render correctly when user unauthorized', () => {
    store = createMockStore({
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
              element={<Header />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render correctly when user authorized', () => {
    createMockStore = configureMockStore();
    store = createMockStore({
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
              element={<Header />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
    expect(screen.getByTestId('Email')).toHaveTextContent(fakeUserData.email);
  });

  it('should should render correctly when user unauthorized clicked to "/login"', () => {
    createMockStore = configureMockStore();
    store = createMockStore({
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
              path={AppRoute.SignIn}
              element={<h1>This is login page</h1>}
            />
            <Route
              path={AppRoute.Main}
              element={<Header />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/This is login page/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByText(/Sign in/i));
    expect(screen.getByText(/This is login page/i)).toBeInTheDocument();
  });

  it('should redirect to "/favorites" url when user authorized clicked to email"', () => {
    history.push(AppRoute.Main);

    createMockStore = configureMockStore();
    store = createMockStore({
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: test,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Favorites}
              element={<h1>This is favorites page</h1>}
            />
            <Route
              path={AppRoute.Main}
              element={<Header />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.queryByText(/This is favorites page/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();

    userEvent.click(screen.getByRole('link', {name: 'test'}));
    expect(screen.getByText(/This is favorites page/i)).toBeInTheDocument();
  });
});

