import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import CitiesList from './cities-list';
import {fakeCity} from '../../utils/mocks';
import {NameSpace} from '../../const';

const history = createMemoryHistory();
const createMockStore = configureMockStore();
const store = createMockStore({
  [NameSpace.App]: {
    activeCity: fakeCity,
  },
});

describe('Component: CitiesList', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <CitiesList />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(fakeCity)).toBeInTheDocument();
  });
});
