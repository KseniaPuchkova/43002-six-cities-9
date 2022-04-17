import {render, screen, fireEvent} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import * as Redux from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import CitiesList from './cities-list';
import {fakeCity, CITIES} from '../../utils/mocks';
import {NameSpace} from '../../const';

const FIRST_CITY = CITIES[0];

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.App]: {
        activeCity: fakeCity,
      },
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CitiesList />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeCity)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(6);
  });

  it('should dispatch with payload and navigate to city when user clicked to', () => {
    const store = mockStore({
      [NameSpace.App]: {
        activeCity: fakeCity,
      },
    });

    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);


    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CitiesList />
        </HistoryRouter>
      </Provider>,
    );

    const [firstCity] = screen.getAllByRole('link');
    fireEvent.click(firstCity);

    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(1, {
      type: 'APP/changeCity', payload: FIRST_CITY,
    });
  });
});
