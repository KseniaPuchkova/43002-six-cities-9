import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import {createMemoryHistory} from 'history';
import FavoritesButton from './favorites-button';
import {AuthorizationStatus, NameSpace} from '../../const';
import {makeFakeOffers, makeFakeOffer, fakeUserData, fakeFavoriteButtonType} from '../../utils/mocks';

const FAKE_OFFER_ID = 1;
const fakeOffer = makeFakeOffer(FAKE_OFFER_ID);
const fakeOffers = makeFakeOffers();

const history = createMemoryHistory();
const createMockStore = configureMockStore();
const store = createMockStore({
  [NameSpace.Data]: {
    offers: fakeOffers,
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: fakeUserData,
  },
});

describe('Component: Favorites', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FavoritesButton offer={fakeOffer} favoriteButtonType={fakeFavoriteButtonType} />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
