import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import SortList from './sort-list';
import {SortType, NameSpace} from '../../const';

const createMockStore = configureMockStore();
const store = createMockStore({
  [NameSpace.App]: {
    sortType: SortType.POPULAR,
  },
});

describe('Component: SortList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

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
