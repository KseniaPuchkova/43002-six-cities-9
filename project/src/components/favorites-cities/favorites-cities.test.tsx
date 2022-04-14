import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import * as Redux from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import FavoritesCities from './favorites-cities';
import {AuthorizationStatus, NameSpace} from '../../const';
import {fakeCity, makeFakeOffers, fakeUserData} from '../../utils/mocks';

const fakeOffers = makeFakeOffers();

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: FavoritesCities', () => {
  it('should render correctly', () => {
    const store = mockStore({
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

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesCities city={fakeCity} favorites={fakeOffers} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeCity)).toBeInTheDocument();
  });

  it('should dispatch with payload and navigate to city when user clicked to', () => {
    const store = mockStore({
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

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesCities city={fakeCity} favorites={fakeOffers} />
        </HistoryRouter>
      </Provider>,
    );

    const [firstCity] = screen.getAllByRole('link');
    userEvent.click(firstCity);

    expect(useDispatch).toBeCalledTimes(101);
    expect(dispatch).nthCalledWith(1, {
      type: 'APP/changeCity', payload: fakeCity,
    });
  });
});
