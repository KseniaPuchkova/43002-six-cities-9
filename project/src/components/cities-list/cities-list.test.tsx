import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import CitiesList from './cities-list';
import {NameSpace} from '../../const';

const default_city = "Paris";

const createMockStore = configureMockStore();
const store = createMockStore({
  [NameSpace.App]: {
    activeCity: default_city,
  },
});
const history = createMemoryHistory();

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
