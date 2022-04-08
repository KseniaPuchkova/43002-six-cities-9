import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import Login from './login';
import {getRandomArrayItem} from '../../utils/utils';
//import {fakeCity} from '../../utils/mocks';
import {AppRoute, AuthorizationStatus, NameSpace, CITIES} from '../../const';

const randomCity = getRandomArrayItem(CITIES);

const history = createMemoryHistory();
history.push(AppRoute.SignIn);
const createMockStore = configureMockStore();
const store = createMockStore({
  [NameSpace.App]: {
    activeCity: randomCity,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: {},
  },
});

describe('Component: Login', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Login />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('email'), 'test@test.ru');
    userEvent.type(screen.getByTestId('password'), '123abc');

    expect(screen.getByDisplayValue(/test@test.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/123abc/i)).toBeInTheDocument();

    expect(screen.getByText(new RegExp(`${randomCity}`, 'i'))).toBeInTheDocument();
  });
});
