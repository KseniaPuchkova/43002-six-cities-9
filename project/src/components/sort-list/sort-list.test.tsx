import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import SortList from './sort-list';
import {SortType, NameSpace} from '../../const';

const history = createMemoryHistory();
const createMockStore = configureMockStore();
const store = createMockStore({
  [NameSpace.App]: {
    sortType: SortType.POPULAR,
  },
});

describe('Component: SortList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SortList />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
  });
});
