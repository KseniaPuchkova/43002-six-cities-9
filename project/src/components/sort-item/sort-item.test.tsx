import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import SortItem from './sort-item';
import {SortType, NameSpace} from '../../const';

const history = createMemoryHistory();
const createMockStore = configureMockStore();
const store = createMockStore({
  [NameSpace.App]: {
    sortType: SortType.POPULAR,
  },
});

describe('Component: SortList', () => {
  const onSortTypeChange = jest.fn();

  it('should render correctly with default sort type', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SortItem key={SortType.POPULAR} sortType={SortType.POPULAR} isActive onSortTypeChange={onSortTypeChange} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Popular/i)).toBeInTheDocument();
    expect(screen.queryByText(/Price High To Low/i)).not.toBeInTheDocument();
  });

  it('should render correctly with another sort type', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SortItem key={SortType.TOP_RATED_FIRST} sortType={SortType.TOP_RATED_FIRST} isActive onSortTypeChange={onSortTypeChange} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Top Rated First/i)).toBeInTheDocument();
    expect(screen.queryByText(/Popular/i)).not.toBeInTheDocument();
  });
});
