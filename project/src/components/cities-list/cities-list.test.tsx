import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import CitiesList from './cities-list';
import {AppRoute, NameSpace} from '../../const';

const default_city = "Paris";

const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.App]: {
    activeCity: default_city,
  },
});

const history = createMemoryHistory();
history.push(AppRoute.Main);

describe('Component: CitiesList', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CitiesList />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(default_city)).toBeInTheDocument();
  });
});
