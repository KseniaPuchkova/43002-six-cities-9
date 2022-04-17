import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import * as Redux from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../history-route/history-route';
import SortList from './sort-list';
import {SortType, NameSpace} from '../../const';

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
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
    expect(screen.getByText('Popular')).toBeInTheDocument();
    expect(screen.queryByText('Price: high to low')).not.toBeInTheDocument();
    expect(screen.queryByText('Price: low to high')).not.toBeInTheDocument();
    expect(screen.queryByText('Top rated first')).not.toBeInTheDocument();
  });

  it('should open sort options when user click', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SortList />
        </HistoryRouter>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('SortType'));
    expect(screen.getAllByText('Popular').length).toBe(2);
    expect(screen.getByText('Price: low to high')).toBeInTheDocument();
    expect(screen.getByText('Price: high to low')).toBeInTheDocument();
    expect(screen.getByText('Top rated first')).toBeInTheDocument();
  });

  it('should dispatch with payload when user clicked to sort type', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SortList />
        </HistoryRouter>
      </Provider>,
    );

    expect(useDispatch).toBeCalledTimes(1);

    userEvent.click(screen.getByTestId('SortType'));
    fireEvent.click(screen.getByTestId(SortType.POPULAR));
    expect(dispatch).nthCalledWith(1, {
      type: 'APP/changeSortType', payload: SortType.POPULAR,
    });

    userEvent.click(screen.getByTestId('SortType'));
    fireEvent.click(screen.getByTestId(SortType.LOW_PRICE_FIRST));
    expect(dispatch).nthCalledWith(2, {
      type: 'APP/changeSortType', payload: SortType.LOW_PRICE_FIRST,
    });

    userEvent.click(screen.getByTestId('SortType'));
    fireEvent.click(screen.getByTestId(SortType.HIGH_PRICE_FIRST));
    expect(dispatch).nthCalledWith(3, {
      type: 'APP/changeSortType', payload: SortType.HIGH_PRICE_FIRST,
    });

    userEvent.click(screen.getByTestId('SortType'));
    fireEvent.click(screen.getByTestId(SortType.TOP_RATED_FIRST));
    expect(dispatch).nthCalledWith(4, {
      type: 'APP/changeSortType', payload: SortType.TOP_RATED_FIRST,
    });
  });
});
